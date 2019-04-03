import React, { useState, useEffect } from "react";

import Config from "Config";
import Tile from "./Tile";
import MQTT from "lib/MQTT";

const topics = [
  "pump",
  "cleaner",
  "poolTemp",
  "poolHeat",
  "poolSetpoint",
  "solarHeat",
  "solarTemp"
];

const PoolTile = ({ device }) => {
  const [state, setState] = useState({ pump: "off" });
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
  }, []);

  const renderPool = () => {
    const renderControl = (ndx, text, big) => {
      const thingState = (state[ndx] || "off").toLowerCase();

      if (thingState === "off") {
        return null;
      }
      if (big) {
        return <div style={{ fontSize: 30 }}>{text}</div>;
      }

      return <div>{text}</div>;
    };

    if (on) {
      return (
        <div>
          {renderControl("pump", `Pool ${state.poolTemp}°F`, true)}
          {renderControl("pump", "Filter On")}
          {renderControl("cleaner", "Cleaner On")}
          {renderControl("waterfall", "Waterfall On")}
          {renderControl("poolHeat", "Pool Heat " + state.poolSetpoint)}
          {renderControl(
            "solarHeat",
            "Solar Heat " +
              (state.solarHeat === "enabled" || state.solarHeat === "on"
                ? state.solarTemp
                : "off")
          )}
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ fontSize: 60 }}>{"Pool Off"}</div>
        </div>
      );
    }
  };

  const on = state.pump.toLowerCase() === "on",
    backgroundColor = on
      ? state.poolHeat === "enabled"
        ? "red"
        : "green"
      : undefined,
    color = on ? "white" : undefined;

  return (
    <Tile
      backgroundColor={backgroundColor}
      color={color}
      width={2}
      height={1}
      onClick={() => {
        localStorage.setItem("autelis-radio", "pool");
        window.location.hash = "poolcontrol";
      }}
    >
      <div style={{ textAlign: "center" }}>{renderPool()}</div>
    </Tile>
  );
};
export default PoolTile;
