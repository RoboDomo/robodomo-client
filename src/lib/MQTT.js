//import Config from "Config";
import EventEmitter from "events";
import { connect } from "mqtt";

class MQTT extends EventEmitter {
  // subscriptions that are registered before a connection has been made will
  // be stored in a Set and propagated when connected
  subscriptionQueue = new Set();

  constructor() {
    super();
    this.connect = this.connect.bind(this);
    this.cache = {};
    this.setMaxListeners(250);

    if (process.env.NODE_ENV === "testing" || process.env.REACT_APP_DEMO === "true") {
      // save a reference for testing
      window.SEND_MQTT_MESSAGE = this.onMessageArrived.bind(this);
    }
  }

  connect() {
    // Don't attempt to connect if we are in a DEMO environment
    if (process.env.REACT_APP_DEMO === "true") {
      import("@/dev/mqtt-sim" /* webpackChunkName: "mqtt-sim" */).then(({ getRandomMessage }) => {
        setInterval(async () => {
          // get a list of subscribed topics
          const subscriptions = Array.from(this.subscriptionQueue)
            .map(([topic]) => topic)
            .filter(Boolean);

          // filter by current subscriptions
          const payload = await getRandomMessage(subscriptions);

          if (payload) {
            this.onMessageArrived(...payload);
          }
        }, process.env.REACT_APP_DEMO_TRAFFIC_INTERVAL || 5000);

        this.getMessageByTopic = async topic => {
          const payload = await getRandomMessage([topic]);
          if (payload) {
            this.onMessageArrived(...payload);
          }
        };
      });

      return;
    }

    this.host = process.env.REACT_APP_MQTT_HOST || "robodomo";
    this.port = process.env.REACT_APP_MQTT_PORT || 80;

    const mqtt = (this.mqtt = connect({ host: this.host, port: this.port }));

    mqtt.on("connect", this.onConnect.bind(this));
    mqtt.on("failure", this.onFailure.bind(this));
    mqtt.on("message", this.onMessageArrived.bind(this));
    mqtt.on("close", this.onConnectionLost.bind(this));
  }

  onConnect() {
    // Work out the subscription queue
    this.subscribeQueued();

    this.emit("connect");
  }

  onFailure() {
    this.emit("failure");
    // mosca retries for us
  }

  emitMessage(topic, payload) {
    try {
      payload = JSON.parse(payload);
    } catch (e) {}
    this.emit(topic, topic, payload);
  }

  onMessageArrived(topic, payload) {
    if (!payload) {
      return;
    }

    const message = payload.toString();
    localStorage.setItem(topic, message);
    this.cache[topic] = message;

    if (this.listenerCount(topic)) {
      console.log(
        "%cMQTT message <<< %c" + topic + " %c" + message.substr(0, 60),
        "font-weight: bold;",
        "color:red; font-weight: bold",
        "color:blue; font-weight: bold"
      );
      this.emitMessage(topic, message);
    }
    this.emit("message", topic, message);
  }

  onConnectionLost(e) {
    console.log("mqtt", "onConnectionLost", e, this.subscriptions);
    this.emit("connectionlost");
    // mosca reonnects for us
  }

  subscribe(topic, handler) {
    if (!this.mqtt) {
      // Looks like we haven't connected yet.
      // We are going to queue up all the subscription so they
      // activate when connection is established
      this.subscriptionQueue.add([topic, handler]);

      // register a listener
      if (handler) {
        this.on(topic, handler);
      }

      console.log(
        "%cMQTT SUBSCRIBTION QUEUED    +++ %c" + topic,
        "font-weight: bold;",
        "color:yellow; font-weight: bold"
      );

      if (process.env.REACT_APP_DEMO === "true") {
        if (this.getMessageByTopic) {
          this.getMessageByTopic(topic);
        }
      }

      return;
    }

    if (!this.listenerCount(topic)) {
      console.log(
        "%cMQTT SUBSCRIBE    +++ %c" + topic,
        "font-weight: bold;",
        "color:darkgreen; font-weight: bold"
      );
      //      console.log("MQTT subscribe", topic);
      this.mqtt.subscribe(topic);
    }
    if (handler) {
      this.on(topic, handler);
    }

    const state = this.cache[topic] || localStorage.getItem(topic);
    if (state && handler) {
      setTimeout(() => {
        try {
          handler(topic, JSON.parse(state));
        } catch (e) {
          handler(topic, state);
        }
      }, 1);
    }
  }

  /**
   * Process queued subscriptions
   */
  subscribeQueued = () => {
    this.subscriptionQueue.forEach(item => {
      this.subscribe(...item);
      this.subscriptionQueue.delete(item);
    });
  };

  unsubscribe(topic, handler) {
    if (!this.mqtt) {
      // if we haven't connected yet then remove subscriptions from the queue instead
      this.subscriptionQueue.forEach(item => {
        const [queuedTopic] = item;
        if (queuedTopic === topic) {
          this.subscriptionQueue.delete(item);
          this.removeListener(...item);
          console.log(
            "%cMQTT QUEUED UNSUBSCRIBE  --- %c" + topic,
            "font-weight: bold;",
            "color:yellow; font-weight: bold"
          );
        }
      });
      return;
    }

    if (handler) {
      this.removeListener(topic, handler);
      if (!this.listenerCount(topic)) {
        console.log(
          "%cMQTT UNSUBSCRIBE  --- %c" + topic,
          "font-weight: bold;",
          "color:darkgreen; font-weight: bold"
        );
        //        console.log("MQTT unsubscribe", topic);
        this.mqtt.unsubscribe(topic);
      }
    } else {
      this.mqtt.unsubscribe(topic);
    }
  }

  publish(topic, message) {
    if (process.env.REACT_APP_DEMO === "true") {
      // save state
      const { set } = require("@/dev/state");
      set(topic.replace(/\/set$/, ""), message);

      // respond back with status after a while to simulate lag
      setTimeout(() => {
        this.onMessageArrived(topic.replace(/set/, "status"), message);
      }, Math.floor(Math.random() * 1500));
      console.log(
        "%cMQTT message >>> %c" + topic + " %c" + message,
        "font-weight: bold;",
        "color:red; font-weight: bold",
        "color:blue; font-weight: bold"
      );
      return;
    }

    if (typeof message !== "string") {
      message = JSON.stringify(message);
      this.mqtt.publish(topic, message);
      console.log(
        "%cMQTT message >>> %c" + topic + " %c" + message,
        "font-weight: bold;",
        "color:red; font-weight: bold",
        "color:blue; font-weight: bold"
      );
      //      console.log("%cMQTT >>>", message, "backround:blue");
    } else {
      this.mqtt.publish(topic, String(message));
      console.log(
        "%cMQTT >>> message %c" + topic + " %c" + String(message),
        "font-weight: bold;",
        "color:red; font-weight: bold",
        "color:blue; font-weight: bold"
      );
      //      console.warn("MQTT >>>", String(message));
    }
  }
}

export default new MQTT();
