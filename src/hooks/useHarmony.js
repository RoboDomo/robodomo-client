import { useState, useEffect, useRef } from "react";

import MQTT from "@/lib/MQTT";

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

const useHarmony = device => {
  // state
  const [currentActivity, setCurrentActivity] = useState(null);
  const [startingActivity, setStartingActivity] = useState(null);
  const [devices, setDevices] = useState(null);
  const commands = useRef(null);
  const activities = useRef(null);

  useEffect(() => {
    const handleStateChange = (topic, newState) => {
      const status_topic = "harmony/" + device + "/status/";
      const key = topic.substr(status_topic.length);
      switch (key) {
        case "activities":
          activities.current = newState;
          break;
        case "devices":
          setDevices(newState);
          break;
        case "currentActivity":
          setCurrentActivity(newState);
          if (activities.current && activities.current[currentActivity]) {
            const current = activities.current[currentActivity];
            const controlGroup = current.controlGroup;
            let c = {};
            for (const group of controlGroup) {
              remap(c, group);
            }
            commands.current = c;
          }
          break;
        case "startingActivity":
          setStartingActivity(newState);
          break;
        default:
          console.log("invalid topic", key, topic, newState);
          break;
      }
    };

    const status_topic = "harmony/" + device + "/status/";
    for (const topic of topics) {
      MQTT.subscribe(status_topic + topic, handleStateChange);
    }
    return () => {
      for (const topic of topics) {
        MQTT.unsubscribe(status_topic + topic, handleStateChange);
      }
    };
  }, [currentActivity, device]);

  const ret = {
    commands: commands.current,
    startingActivity: startingActivity,
    currentActivity: currentActivity,
    devices: devices,
    activities: activities.current,
  };
  return ret;
};

//
export default useHarmony;
