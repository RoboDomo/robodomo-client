import React, { useState, useEffect } from "react";
import { Badge, ListGroup } from "react-bootstrap";

import Config from "Config";
import MQTT from "lib/MQTT";
import { GiComputerFan } from "react-icons/gi";

const FanItem = ({ name }) => {
  const status_topic = `${Config.mqtt.smartthings}/${name}/`,
    status_topic_length = status_topic.length,
    set_topic = status_topic;
  const [power, setPower] = useState("off");
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const onStateChange = (topic, newState) => {
      const key = topic.substr(status_topic_length);
      switch (key) {
        case "switch":
          setPower(newState);
          break;
        case "level":
          setLevel(newState);
          break;
        default:
          console.log("invalid state", key);
          break;
      }
    };

    MQTT.subscribe(status_topic + "switch", onStateChange);
    MQTT.subscribe(status_topic + "level", onStateChange);

    return () => {
      MQTT.unsubscribe(status_topic + "switch", onStateChange);
      MQTT.unsubscribe(status_topic + "level", onStateChange);
    };
  }, []);

  const onClick = e => {
    e.stopPropagation();

    let value = 25,
      lvl = Number(level);

    if (power === "off") {
      lvl = 25;
    } else if (lvl < 34) {
      value = 50;
    } else if (lvl < 67) {
      value = 75;
    } else {
      value = 0;
    }

    if (value) {
      setLevel(value);
      setPower("on");
      MQTT.publish(set_topic + "switch/set", "on");
      MQTT.publish(set_topic + "level/set", value);
    } else {
      setPower("off");
      MQTT.publish(set_topic + "switch/set", "off");
    }
  };

  let value = "Off";
  if (power === "on") {
    const l = Number(level);
    if (l < 34) {
      value = "Low";
    } else if (l < 67) {
      value = "Medium";
    } else {
      value = "High";
    }
  }
  return (
    <ListGroup.Item
      style={{
        color: power === "on" ? "yellow" : undefined
      }}
      onClick={onClick}
    >
      <GiComputerFan size={36} style={{ paddingBottom: 12 }} />
      <span style={{ fontSize: 20, marginLeft: 2 }}>{name}</span>
      <Badge
        className="float-right"
        variant="secondary"
        style={{ fontSize: 20, marginLeft: 10 }}
      >
        {value}
      </Badge>
    </ListGroup.Item>
  );
};

export default FanItem;
