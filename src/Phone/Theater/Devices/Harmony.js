import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";

import XBoxButtons from "common/harmony/XBoxButtons";
import RokuButtons from "common/harmony/RokuButtons";
import TiVoButtons from "common/harmony/TiVoButtons";
import AppleTVButtons from "common/harmony/AppleTVButtons";
import JoystickButtons from "common/harmony/JoystickButtons";
import ColoredButtons from "common/harmony/ColoredButtons";
import ABCDButtons from "common/harmony/ABCDButtons";
import NumberButtons from "common/harmony/NumberButtons";
import TransportButtons from "common/harmony/TransportButtons";

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

const rowStyle = {
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
  }, [handleStateChange, status_topic]);

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
        <RokuButtons style={rowStyle} device={hub.device} commands={commands} />
        <XBoxButtons style={rowStyle} device={hub.device} commands={commands} />
        <AppleTVButtons style={rowStyle} device={hub.device} commands={commands} />
        <TiVoButtons style={rowStyle} device={hub.device} commands={commands} />
        <ColoredButtons style={rowStyle} device={hub.device} commands={commands} />
        <ABCDButtons style={rowStyle} device={hub.device} commands={commands} />
        <JoystickButtons style={rowStyle} device={hub.device} commands={commands} />
        <NumberButtons style={rowStyle} device={hub.device} commands={commands} />
        <TransportButtons style={rowStyle} device={hub.device} commands={commands} />
      </>
    );
  }
  return null;
};

export default HarmonyRemoteControl;
