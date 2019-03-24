import React, { useState, useEffect } from "react";

import Config from "Config";
import Tile from "components/Tile";
import MQTT from "lib/MQTT";

const topics = ["spaHeat", "spaTemp", "spa", "jet", "blower", "spaLight"];

const SpaTile = ({ device }) => {
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
  }, []);

  const isOn = thing => {
    const control = state[thing];

    if (!control) {
      return false;
    }
    return control.toLowerCase() === "on";
  };
  const on =
      isOn("spa") ||
      isOn("spaHeat") ||
      isOn("jet") ||
      isOn("blower") ||
      isOn("spaLight"),
    backgroundColor = on ? "red" : undefined,
    color = on ? "white" : undefined;

  const renderControl = (ndx, text, big) => {
    const thing = state[ndx];
    //        if (thing && state.spa !== 'on' ||  thing.toLowerCase() === 'off' ) {
    if (!thing || thing.toLowerCase() === "off") {
      return null;
    }
    if (big) {
      return <div style={{ fontSize: 30 }}>{text}</div>;
    }

    return <div>{text}</div>;
  };

  const renderSpa = () => {
    if (on) {
      return (
        <div>
          {renderControl("spa", `Spa ${state.spaTemp}°F`, true)}
          {renderControl("spaHeat", "Heat On")}
          {renderControl("jet", "Jets On")}
          {renderControl("blower", "Blower On")}
          {renderControl("spaLight", "Light On")}
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ fontSize: 60 }}>{"Spa Off"}</div>
        </div>
      );
    }
  };

  return (
    <Tile
      width={2}
      height={1}
      onClick={() => {
        localStorage.setItem("autelis-radio", "spa");
        window.location.hash = "poolcontrol";
      }}
      backgroundColor={backgroundColor}
      color={color}
    >
      <div style={{ textAlign: "center" }}>{renderSpa()}</div>
    </Tile>
  );
};
export default SpaTile;
