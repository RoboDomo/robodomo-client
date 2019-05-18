import { useReducer, useRef } from "react";

import MQTT from "lib/MQTT";

// hash map of arrays of subscriptions.  Index/key is topic, value is an array of functions.
const subscriptions = {};

const useMQTT = config => {
  const masterHandler = (topic, message) => {
    if (!subscriptions[topic]) {
      throw new Error(
        "Received message for topic " +
          topic +
          " without any subscrbed handlers"
      );
    }
    for (const fn of subscriptions[topic]) {
      fn(topic, message);
    }
  };

  const reducer = useRef((state, action) => {
    const { type, topic, handler } = action;

    switch (type) {
      case "subscribe":
        if (!topic || !handler) {
          throw new Error("useMQTT subscribe requires topic and handler");
        }
        if (!subscriptions[topic]) {
          subscriptions[topic] = [];
        }
        if (!subscriptions[topic].length) {
          MQTT.subscribe(topic, masterHandler);
          subscriptions[topic].push(handler);
        } else if (subscriptions[topic].indexOf(handler) === -1) {
          subscriptions.push(handler);
        }
        break;

      case "unsubscribe":
        if (!subscriptions[topic] || subscriptions[topic].length === 0) {
          throw new Error("no subscriptions for topic " + topic);
        }
        const ndx = subscriptions[topic].indexOf(handler);
        if (ndx === -1) {
          throw new Error("Not subscribed to topic " + topic);
        }
        subscriptions[topic].splice(ndx, subscriptions[topic].length);
        if (subscriptions[topic].length === 0) {
          MQTT.unsubscribe(topic, masterHandler);
        }
        break;

      default:
        break;
    }
  });
  //
  const [, d] = useReducer(reducer.current);
  return {
    dispatch: d
  };
};

export default useMQTT;
