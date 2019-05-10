import React, { useReducer, useRef, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "./Tile";
import { GiComputerFan } from "react-icons/gi";

const FanTile = ({ name }) => {
  const status_topic = `${Config.mqtt.smartthings}/${name}/`,
    status_topic_length = status_topic.length,
    set_topic = status_topic;

  const power = useRef("off");
  const level = useRef(0);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const onStateChange = (topic, newState) => {
      const key = topic.substr(status_topic_length);
      switch (key) {
        case "switch":
          power.current = newState;
          forceUpdate();
          break;
        case "level":
          level.current = newState;
          //          power.current = "on";
          forceUpdate();
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
      lvl = Number(level.current);

    if (power.current === "off") {
      lvl = 25;
    } else if (lvl < 34) {
      value = 50;
    } else if (lvl < 67) {
      value = 75;
    } else {
      value = 0;
    }

    if (value) {
      if (power.current !== "on") {
        MQTT.publish(set_topic + "switch/set", "on");
        level.current = value;
        forceUpdate();
        // we need to delay a bit so the switch on takes
        setTimeout(() => {
          MQTT.publish(set_topic + "level/set", value);
          level.current = value;
          forceUpdate();
        }, 100);
      } else {
        MQTT.publish(set_topic + "level/set", value);
        level.current = value;
        forceUpdate();
      }
    } else {
      MQTT.publish(set_topic + "switch/set", "off");
      forceUpdate();
    }
  };

  // render
  let value = "Off";
  if (power.current === "on") {
    const l = Number(level.current);
    if (l < 34) {
      value = "Low";
    } else if (l < 67) {
      value = "Medium";
    } else {
      value = "High";
    }
  }

  return (
    <Tile width={1} height={1}>
      <div
        style={{
          textAlign: "center",
          color: power.current === "on" ? "yellow" : undefined
        }}
        onClick={onClick}
      >
        <GiComputerFan size={24} style={{ marginBottom: 10 }} />
        <div>{name}</div>
        <div style={{ fontSize: 30 }}>{value}</div>
      </div>
    </Tile>
  );
};

export default FanTile;
