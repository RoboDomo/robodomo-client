import React, { useState, useEffect } from "react";
import { ListGroup, Badge } from "react-bootstrap";

import Config from "Config";
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

const PoolItem = ({ device }) => {
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

  const renderControl = (ndx, text, big) => {
    const thingState = (state[ndx] || "off").toLowerCase();

    if (thingState === "off") {
      return null;
    }
    if (big) {
      return <div style={{ fontSize: 30 }}>{text}</div>;
    }

    return (
      <div>
        <Badge
          style={{ marginBottom: 4 }}
          variant="secondary"
          className="float-right"
        >
          {text}
        </Badge>
      </div>
    );
  };

  const on = state.pump.toLowerCase() === "on",
    variant = on
      ? state.poolHeat === "enabled"
        ? "danger"
        : "success"
      : undefined;

  if (on) {
    return (
      <ListGroup.Item variant={variant} style={{ display: "flex" }}>
        <div style={{ flex: 1, fontSize: 40 }}>Pool {state.poolTemp}&deg;F</div>
        <div>
          {renderControl("pump", "Filter")}
          {renderControl("cleaner", "Cleaner")}
          {renderControl("waterfall", "Waterfall")}
          {renderControl("poolHeat", "Pool Heat " + state.poolSetpoint)}
          {renderControl(
            "solarHeat",
            "Solar " +
              (state.solarHeat === "enabled" || state.solarHeat === "on"
                ? state.solarTemp + "°F"
                : "off")
          )}
        </div>
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        <div style={{ fontSize: 60 }}>{"Pool Off"}</div>
      </ListGroup.Item>
    );
  }
};

export default PoolItem;
