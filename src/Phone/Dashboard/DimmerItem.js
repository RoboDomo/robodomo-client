import React, { useState, useEffect } from "react";
import { Badge, ListGroup } from "react-bootstrap";

import Config from "@/Config";
import MQTT from "@/lib/MQTT";

import { TiAdjustBrightness } from "react-icons/ti";

const DimmerItem = ({ name }) => {
  const status_topic = `${Config.mqtt.smartthings}/${name}/`,
    status_topic_length = status_topic.length,
    set_topic = status_topic;

  const [level, setLevel] = useState(0);
  const [power, setPower] = useState("off");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = e => {
    e.stopPropagation();

    if (power === "on") {
      setPower("off");
      MQTT.publish(set_topic + "switch/set", "off");
    } else {
      setPower("on");
      MQTT.publish(set_topic + "switch/set", "on");
    }
  };

  const style =
    power === "off"
      ? {
          color: undefined,
          value: "Off",
        }
      : {
          color: "yellow",
          value: `${level}%`,
        };

  return (
    <ListGroup.Item style={{ whiteSpace: "nowrap", color: style.color }} onClick={onClick}>
      <TiAdjustBrightness size={24} style={{ paddingBottom: 10 }} />
      <span style={{ fontSize: 20, fontWeight: "normal" }}>{name}</span>
      <Badge className="float-right" variant="secondary" style={{ fontSize: 20, marginLeft: 10 }}>
        {style.value}
      </Badge>
    </ListGroup.Item>
  );
};

export default DimmerItem;
