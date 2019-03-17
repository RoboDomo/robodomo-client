import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";

//import RemoteButton from "components/common/RemoteButton";
//import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

import XBoxButtons from "components/harmony/XBoxButtons";
import RokuButtons from "components/harmony/RokuButtons";
import TiVoButtons from "components/harmony/TiVoButtons";
import AppleTVButtons from "components/harmony/AppleTVButtons";
import JoystickButtons from "components/harmony/JoystickButtons";
import ColoredButtons from "components/harmony/ColoredButtons";
import ABCDButtons from "components/harmony/ABCDButtons";
import NumberButtons from "components/harmony/NumberButtons";
import TransportButtons from "components/harmony/TransportButtons";

const topics = ["activities", "devices", "currentActivity", "startingActivity"];

const remap = (o, controlGroup) => {
  if (controlGroup && controlGroup.function) {
    for (const control of controlGroup.function) {
      o[control.name] = control;
      try {
        control.action = JSON.parse(control.action);
      } catch (e) {}
    }
  }
  return o;
};

const HarmonyRemoteControl = ({ hub }) => {
  // state
  const [currentActivity, setCurrentActivity] = useState(null);
  const [startingActivity, setStartingActivity] = useState(null);
  const [activities, setActivities] = useState(null);
  const [devices, setDevices] = useState(null);

  const status_topic = Config.mqtt.harmony + "/" + hub.device + "/status/",
    status_topic_length = status_topic.length;

  const handleStateChange = (topic, newState) => {
    const key = topic.substr(status_topic_length);
    switch (key) {
      case "activities":
        setActivities(newState);
        //        console.log("activities", newState);
        break;
      case "devices":
        setDevices(newState);
        //        console.log("devices", newState);
        break;
      case "currentActivity":
        setCurrentActivity(newState);
        break;
      case "startingActivity":
        setStartingActivity(newState);
        break;
      default:
        console.log("invalid topic", key, topic, newState);
        break;
    }
  };

  useEffect(() => {
    for (const topic of topics) {
      MQTT.subscribe(status_topic + topic, handleStateChange);
    }
    return () => {
      for (const topic of topics) {
        MQTT.unsubscribe(status_topic + topic, handleStateChange);
      }
    };
  }, []);

  // render
  if (activities && startingActivity) {
    return <h1>Starting {activities[startingActivity].label}...</h1>;
  }
  if (activities && devices && currentActivity) {
    const current = activities[currentActivity];
    if (!current) {
      return null;
    }
    const controlGroup = current.controlGroup;

    let commands = {};
    for (const group of controlGroup) {
      remap(commands, group);
    }

    console.log("commands", commands);
    return (
      <>
        <RokuButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <XBoxButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <AppleTVButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <TiVoButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <ColoredButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <ABCDButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <JoystickButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <NumberButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
        <TransportButtons
          style={{ marginBottom: 4 }}
          device={hub.device}
          commands={commands}
        />
      </>
    );
  }
  return null;
};
export default HarmonyRemoteControl;
