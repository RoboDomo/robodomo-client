import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Config from "Config";

import MQTT from "lib/MQTT";
import RemoteButton from "components/common/RemoteButton";

const FanButton = ({ name }) => {
  const [power, setPower] = useState("off");
  const [level, setLevel] = useState(5);

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
    let value = 25;

    if (power === "off") {
      value = 25;
    } else if (level < 34) {
      value = 50;
    } else if (level < 67) {
      value = 75;
    } else {
      value = 0;
    }

    if (value) {
      setPower("on");
      setLevel(value);
      MQTT.publish(set_topic + "switch/set", "on");
      setTimeout(() => {
        MQTT.publish(set_topic + "level/set", value);
      }, 250);
    } else {
      setPower("off");
      MQTT.publish(set_topic + "switch/set", "off");
    }
  };

  let value = "Off";
  if (power === "on") {
    if (level < 34) {
      value = "Low";
    } else if (level < 67) {
      value = "Medium";
    } else {
      value = "High";
    }
  }
  return (
    <div>
      <RemoteButton onClick={handleClick}>{value}</RemoteButton>
    </div>
  );
};

FanButton.propTypes = {
  name: PropTypes.string.isRequired
};

export default FanButton;
