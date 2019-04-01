import React, { useState, useEffect, useRef } from "react";
//import { Row, Col } from "react-bootstrap";
//import { ListGroup } from "react-bootstrap";
import ActivitiesMenu from "./ActivitiesMenu";
import DevicesMenu from "./DevicesMenu";
import Audio from "./Devices/Audio";
import TiVo from "./Devices/TiVo";
import AppleTV from "./Devices/AppleTV";
import LGTV from "./Devices/LGTV";
import Harmony from "./Devices/Harmony";

import MQTT from "lib/MQTT";
//import MQTTScript from "lib/MQTTScript";

const TheaterTab = ({ theater }) => {
  const [power, setPower] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("None");
  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [startingActivity, setStartingActivity] = useState(null);
  const [avrInput, setAVRInput] = useState(null);
  const [lgtv, setLGTV] = useState({});

  // devices
  const denon = useRef(null);
  const devices = theater.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
    if (device.type === "denon") {
      denon.current = device;
    }
  }

  const handleDeviceClick = device => {
    setCurrentDevice(device);
  };

  // activities
  const activities = theater.activities || [],
    activitiesMap = {};

  for (const activity of activities) {
    activitiesMap[activity.name] = activities;
  }

  const handleActivityClick = activity => {
    setCurrentActivity(activity.name);
    setCurrentDevice(activity.defaultDevice);
    setStartingActivity(activity);
  };

  let tvType = "unknown";

  const tvInput = useRef("");
  const launchPoints = useRef([]);
  const foregroundApp = useRef(null);

  useEffect(() => {
    const onMessage = (topic, message) => {
      if (~topic.indexOf("power")) {
        setPower(message === "on");
      } else if (~topic.indexOf("foreground")) {
        try {
          foregroundApp.current = JSON.parse(message);
        } catch (e) {
          foregroundApp.current = message;
        }
      } else if (~topic.indexOf("launchPoints")) {
        try {
          launchPoints.current = JSON.parse(message);
        } catch (e) {
          launchPoints.current = message;
        }
      } else if (~topic.indexOf("SI")) {
        setAVRInput(message);
      }

      // determine TV input (e.g. HDMI1, HDMI2, NetFlix, etc.)
      if (!power) {
        setCurrentActivity("All Off");
        setCurrentDevice("NONE");
        return;
      }

      try {
        if (tvType === "lgtv") {
          const lps = launchPoints.current,
            fg = foregroundApp.current,
            title = lps[fg.appId].title;
          const lp = title || "unknown";
          tvInput.current = lp.replace(/\s+/, "").toLowerCase();
          const o = Object.assign({}, deviceMap.lgtv);
          o.foregroundApp = foregroundApp.current;
          o.launchPoints = launchPoints.current;
          o.power = power;
          setLGTV(prev => ({ ...prev, ...o }));
        }
      } catch (e) {}

      for (const activity of activities) {
        const inputs = activity.inputs || {};
        if (inputs.tv === tvInput.current && inputs.avr === avrInput) {
          if (currentActivity !== activity.name) {
            setCurrentDevice(activity.defaultDevice);
            setCurrentActivity(activity.name);
            break;
          }
        }
      }
    }; // onMessage

    for (const device of devices) {
      switch (device.type) {
        case "lgtv":
          tvType = "lgtv";
          MQTT.subscribe(`lgtv/${device.device}/status/power`, onMessage);
          MQTT.subscribe(
            `lgtv/${device.device}/status/foregroundApp`,
            onMessage
          );
          MQTT.subscribe(
            `lgtv/${device.device}/status/launchPoints`,
            onMessage
          );
          break;
        case "denon":
          MQTT.subscribe(`denon/${device.device}/status/SI`, onMessage);
          break;
        default:
          break;
      }
    }
    return () => {
      for (const device of devices) {
        switch (device.type) {
          case "lgtv":
            MQTT.unsubscribe(`lgtv/${device.device}/status/power`, onMessage);
            MQTT.unsubscribe(
              `lgtv/${device.device}/status/foregroundApp`,
              onMessage
            );
            MQTT.unsubscribe(
              `lgtv/${device.device}/status/launchPoints`,
              onMessage
            );
            break;
          case "denon":
            MQTT.unsubscribe(`denon/${device.device}/status/SI`, onMessage);
            break;
          default:
            break;
        }
      }
    };
  }, [power, currentDevice, currentActivity, avrInput]);

  const renderDevice = () => {
    switch (currentDevice) {
      case "TiVo":
        return <TiVo device={deviceMap.tivo.device} />;
      case "Harmony Hub":
        return <Harmony hub={deviceMap.harmony} />;
      case "LG TV":
        if (!deviceMap.lgtv) {
          console.log("deviceMap", deviceMap);
          return null;
        }
        return <LGTV lgtv={lgtv} tvInput={tvInput} avrInput={avrInput} />;
      case "Apple TV":
        return <AppleTV device={deviceMap.appletv.device} />;
      default:
        //        console.log("renderDevice unknown", currentDevice);
        return null;
    }
  };

  if (startingActivity) {
    return <div>Starting {startingActivity}</div>;
  }

  return (
    <div style={{ overflow: "scroll", height: "100vh", paddingBottom: 300 }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, fontSize: 18, textAlign: "center" }}>
          Activity
          <br />
          <ActivitiesMenu
            onSelect={handleActivityClick}
            activities={activities}
            currentActivity={currentActivity}
          />
        </div>
        <div style={{ flex: 1, fontSize: 18, textAlign: "center" }}>
          Device
          <br />
          <DevicesMenu
            onSelect={handleDeviceClick}
            devices={devices}
            currentDevice={currentDevice}
          />
        </div>
      </div>
      {renderDevice()}

      <div style={{ height: 10 }} />
      <Audio device={denon.current} />
    </div>
  );
};

export default TheaterTab;
