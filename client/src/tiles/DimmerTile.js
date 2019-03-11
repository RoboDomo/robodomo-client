import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "components/Tile";

import { TiAdjustBrightness } from "react-icons/ti";

export default ({ name }) => {
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
          value: "Off"
        }
      : {
          color: "yellow",
          value: `${level}%`
        };

  return (
    <Tile width={1} height={1}>
      <div
        style={{ textAlign: "center", color: style.color }}
        onClick={onClick}
      >
        <TiAdjustBrightness size={24} style={{ marginBottom: 10 }} />
        <div style={{ fontWeight: "normal" }}>{name}</div>
        <div style={{ fontSize: 30 }}>{style.value}</div>
      </div>
    </Tile>
  );
};
