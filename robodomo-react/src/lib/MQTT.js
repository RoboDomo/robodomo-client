import Config from "Config";
import EventEmitter from "events";
import { connect } from "mqtt";

const RETRY_TIME = 2000;

class MQTT extends EventEmitter {
  constructor() {
    super();
    this.connect = this.connect.bind(this);
    this.cache = {};
  }

  connect() {
    console.log("connecting", Config.mqtt.host, Config.mqtt.port);
    this.host = Config.mqtt.host;
    this.port = Config.mqtt.port;
    const mqtt = (this.mqtt = connect({ host: this.host, port: this.port }));

    mqtt.on("connect", this.onConnect.bind(this));
    mqtt.on("failure", this.onFailure.bind(this));
    mqtt.on("message", this.onMessageArrived.bind(this));
    mqtt.on("close", this.onConnectionLost.bind(this));
  }

  onConnect() {
    this.emit("connect");
  }

  onFailure() {
    console.log("mqtt", "onFailure");
    this.emit("failure");
    setTimeout(this.connect, RETRY_TIME);
  }

  emitMessage(topic, payload) {
    try {
      payload = JSON.parse(payload);
    } catch (e) {}
    this.emit(topic, topic, payload);
  }

  onMessageArrived(topic, payload) {
    const message = payload.toString();
    localStorage.setItem(topic, message);
    this.cache[topic] = message;
    if (this.listenerCount(topic)) {
      console.log("message", topic, message.substr(0, 20));
      this.emitMessage(topic, message);
    }
    this.emit("message", topic, message);
  }

  onConnectionLost({ errorCode, errorMessage }) {
    console.log(
      "mqtt",
      "onConnectionLost",
      errorCode,
      errorMessage,
      this.subscriptions
    );
    this.emit("connectionlost");
    setTimeout(this.connect, RETRY_TIME);
  }

  subscribe(topic, handler) {
    if (!this.listenerCount(topic)) {
      console.log("MQTT subscribe", topic);
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

  unsubscribe(topic, handler) {
    if (handler) {
      this.removeListener(topic, handler);
      if (!this.listenerCount(topic)) {
        console.log("MQTT unsubscribe", topic);
        this.mqtt.unsubscribe(topic);
      }
    } else {
      this.mqtt.unsubscribe(topic);
    }
  }

  publish(topic, message) {
    if (typeof message !== "string") {
      message = JSON.stringify(message);
      this.mqtt.publish(topic, message);
    } else {
      this.mqtt.publish(topic, String(message));
    }
  }
}

export default new MQTT();
