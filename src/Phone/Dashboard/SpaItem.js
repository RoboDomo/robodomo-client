import React, { useState, useEffect } from "react";
import useConfig from "@/common/hooks/useConfig";

import { ListGroup, Badge } from "react-bootstrap";

import MQTT from "lib/MQTT";

const topics = ["spaHeat", "spaTemp", "spa", "jet", "blower", "spaLight"];
const SpaItem = ({ device }) => {
  const Config = useConfig();
  const [state, setState] = useState({});

  const controller = Config[device],
    deviceMap = controller.deviceMap,
    status_topic = Config.mqtt[device] + "/status/",
    status_topic_length = status_topic.length;

  useEffect(() => {
    const onStateChange = (topic, newState) => {
      const newValue = {},
        what = topic.substr(status_topic_length),
        key = deviceMap.backward[what] || what;

      newValue[key] = newState;
      setState(prev => ({ ...prev, ...newValue }));
    };
    topics.forEach(topic => {
      const device = deviceMap.forward[topic] || topic;
      MQTT.subscribe(status_topic + device, onStateChange);
    });
    return () => {
      topics.forEach(topic => {
        const device = deviceMap.forward[topic] || topic;
        MQTT.unsubscribe(status_topic + device, onStateChange);
      });
    };
  }, [deviceMap.backward, deviceMap.forward, status_topic, status_topic_length]);

  const isOn = thing => {
    const control = state[thing];

    if (!control) {
      return false;
    }
    return control.toLowerCase() === "on";
  };

  const on = isOn("spa") || isOn("spaHeat") || isOn("jet") || isOn("blower") || isOn("spaLight"),
    variant = on ? "danger" : undefined;

  const renderControl = (ndx, text, big) => {
    const thing = state[ndx];
    //        if (thing && state.spa !== 'on' ||  thing.toLowerCase() === 'off' ) {
    if (!thing || thing.toLowerCase() === "off") {
      return null;
    }
    if (big) {
      return (
        <Badge variant="secondary" className="float-right" style={{ fontSize: 30 }}>
          {text}
        </Badge>
      );
    }

    return <div>{text}</div>;
  };

  if (on) {
    return (
      <ListGroup.Item variant={variant}>
        {renderControl("spa", `Spa ${state.spaTemp}°F`, true)}
        {renderControl("spaHeat", "Heat On")}
        {renderControl("jet", "Jets On")}
        {renderControl("blower", "Blower On")}
        {renderControl("spaLight", "Light On")}
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        <div style={{ fontSize: 40 }}>{"Spa Off"}</div>
      </ListGroup.Item>
    );
  }
};

export default SpaItem;
