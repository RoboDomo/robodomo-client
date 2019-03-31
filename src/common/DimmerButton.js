import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Config from "Config";

import MQTT from "lib/MQTT";
import RemoteButton from "common/RemoteButton";

const DimmerButton = ({ children, name }) => {
  const [power, setPower] = useState("off");
  const [level, setLevel] = useState(20);
  const status_topic = Config.mqtt.smartthings + "/" + name + "/",
    set_topic = status_topic;

  useEffect(() => {
    const onStateChange = (topic, newState) => {
      if (~topic.indexOf("switch")) {
        setPower(newState);
      } else if (~topic.indexOf("level")) {
        setLevel(newState);
      } else {
        console.log("invlaid topic/state", topic, newState);
      }
    };
    MQTT.subscribe(status_topic + "switch", onStateChange);
    MQTT.subscribe(status_topic + "level", onStateChange);
    return () => {
      MQTT.unsubscribe(status_topic + "switch", onStateChange);
      MQTT.unsubscribe(status_topic + "level", onStateChange);
    };
  }, []);

  const handleClick = () => {
    if (power === "on") {
      setPower("off");
      MQTT.publish(set_topic + "switch/set", "off");
    } else {
      setPower("on");
      MQTT.publish(set_topic + "switch/set", "on");
    }
  };

  const value = power === "on" ? Number(level) + "%" : "Off";
  return (
    <div>
      <RemoteButton onClick={handleClick}>{value}</RemoteButton>
    </div>
  );
};

DimmerButton.propTypes = {
  name: PropTypes.string.isRequired
};
export default DimmerButton;
