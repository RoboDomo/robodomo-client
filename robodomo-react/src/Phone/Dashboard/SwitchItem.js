import React, { useState, useEffect } from "react";
import { Badge, ListGroup } from "react-bootstrap";

import Config from "Config";
import MQTT from "lib/MQTT";
import { TiLightbulb } from "react-icons/ti";

const SwitchItem = ({ name }) => {
  const [state, setState] = useState("off");
  const status_topic = Config.mqtt.smartthings + "/" + name + "/",
    set_topic = status_topic;

  useEffect(() => {
    const onStateChange = (topic, newState) => {
      setState(newState);
    };
    MQTT.subscribe(status_topic + "switch", onStateChange);
    return () => {
      MQTT.unsubscribe(status_topic + "switch", onStateChange);
    };
  }, []);

  const onClick = e => {
    e.stopPropagation();

    if (state === "on") {
      setState("off");
      MQTT.publish(set_topic + "switch/set", "off");
    } else {
      setState("on");
      MQTT.publish(set_topic + "switch/set", "on");
    }
  };
  if (state === "off") {
    return (
      <ListGroup.Item onClick={onClick}>
        <TiLightbulb size={24} style={{ marginBottom: 10 }} />
        <span style={{ fontSize: 20, fontWeight: "normal" }}>{name}</span>
        <Badge
          variant="secondary"
          className="float-right"
          style={{ fontSize: 20, marginLeft: 10 }}
        >
          Off
        </Badge>
      </ListGroup.Item>
    );
  }
  return (
    <ListGroup.Item style={{ color: "yellow" }} onClick={onClick}>
      <TiLightbulb size={24} style={{ marginBottom: 10 }} />
      <span style={{ fontSize: 20, fontWeight: "normal" }}>{name}</span>
      <Badge
        variant="secondary"
        className="float-right"
        style={{ fontSize: 20, marginLeft: 10 }}
      >
        On
      </Badge>
    </ListGroup.Item>
  );
};

export default SwitchItem;
