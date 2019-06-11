import React, { useState, useEffect } from "react";
import useConfig from "@/common/hooks/useConfig";

import MQTT from "lib/MQTT";
import Tile from "./Tile";
import { TiLightbulb } from "react-icons/ti";

const SwitchTile = ({ name }) => {
  const Config = useConfig();
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
  }, [status_topic]);

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
      <Tile width={1} height={1}>
        <div style={{ textAlign: "center" }} onClick={onClick}>
          <TiLightbulb size={24} style={{ marginBottom: 10 }} />
          <div style={{ fontWeight: "normal" }}>{name}</div>
          <div style={{ fontSize: 30 }}>Off</div>
        </div>
      </Tile>
    );
  }
  return (
    <Tile width={1} height={1}>
      <div style={{ textAlign: "center", color: "yellow" }} onClick={onClick}>
        <TiLightbulb size={24} style={{ marginBottom: 10 }} />
        <div style={{ fontWeight: "normal" }}>{name}</div>
        <div style={{ fontSize: 30 }}>On</div>
      </div>
    </Tile>
  );
};

export default SwitchTile;
