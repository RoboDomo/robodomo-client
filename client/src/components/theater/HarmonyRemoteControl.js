import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

import Joystick from "components/harmony/Joystick";
import ColoredButtons from "components/harmony/ColoredButtons";
import NumericBasic from "components/harmony/NumericBasic";

const topics = ["activities", "devices", "currentActivity", "startingActivity"];

const remap = (o, controlGroup) => {
  if (controlGroup && controlGroup.function) {
    for (const control of controlGroup.function) {
      o[control.name] = control;
      try {
        o[control.action] = JSON.parse(o[control.action]);
      } catch (e) {}
    }
  }
  return o;
};

export default ({ hub }) => {
  // state
  const [currentActivity, setCurrentActivity] = useState(null);
  const [startingActivity, setStartingActivity] = useState(null);
  const [activities, setActivities] = useState(null);
  const [devices, setDevices] = useState(null);

  const status_topic = Config.mqtt.harmony + "/" + hub.device + "/status/",
    status_topic_length = status_topic.length,
    set_topic = status_topic.replace("status", "set");

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
        <Joystick device={hub.device} commands={commands} />
        <ColoredButtons device={hub.device} commands={commands} />
        <NumericBasic device={hub.device} commands={commands} />
      </>
    );
    /*
    return (
      <div style={{ textAlign: "left" }}>
        <NumericBasic topic={set_topic} controlGroup={current.controlGroup} />
        <div>
          Current Activity {currentActivity} {current.label} {startingActivity}
        </div>
        <h1>Activities</h1>
        {Object.keys(activities).map(key => {
          const activity = activities[key];
          return (
            <li key={activity.id}>
              {activity.id} {activity.label}
            </li>
          );
        })}
        <h1>Devices</h1>
        {Object.keys(devices).map(key => {
          const device = devices[key];
          return (
            <li key={device.id}>
              {device.id} {device.label}
            </li>
          );
        })}
      </div>
    );
    */
  }
  return <div>Harmony Remote {hub.device}</div>;
};
