import React, { useState, useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import MQTT from "@/lib/MQTT";
import Config from "@/Config";

import TiVo from "../Dashboard/Theater/TiVo";
import AppleTV from "../Dashboard/Theater/AppleTV";

const TheaterItem = ({ title }) => {
  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [power, setPower] = useState(false);
  const [foregroundApp, setForegroundApp] = useState(null);
  const [avrInput, setAvrInput] = useState("OFF");
  const [tvInput, setTVInput] = useState("OFF");

  const launchPoints = useRef(null);
  const lgtv = useRef({});
  const currentDevice = useRef("None");
  const appleTV = useRef(null);
  const tivo = useRef(null);
  const denon = useRef(null);

  let tvType = "unknown";

  useEffect(() => {
    const onMessage = (topic, message) => {
      if (~topic.indexOf("power")) {
        setPower(message.toUpperCase() !== "ON");
      } else if (~topic.indexOf("launchPoints")) {
        try {
          launchPoints.current = JSON.parse(message);
        } catch (e) {
          launchPoints.current = message;
        }
      } else if (~topic.indexOf("foreground")) {
        try {
          setForegroundApp(JSON.parse(message));
        } catch (e) {
          setForegroundApp(message);
        }
      } else if (~topic.indexOf("SI")) {
        setAvrInput(message);
      }
      // determine TV input (e.g. HDMI1, HDMI2, NetFlix, etc.)
      if (power) {
        console.log("__________POWER ", power);
        setCurrentActivity("All Off");
        return;
      }

      try {
        if (tvType === "lgtv" && launchPoints.current) {
          const lps = launchPoints.current,
            fg = foregroundApp,
            title = lps[fg.appId].title;
          const lp = title || "unknown";
          setTVInput(lp.replace(/\s+/, "").toLowerCase());
          const o = Object.assign({}, deviceMap.lgtv);
          o.foregroundApp = foregroundApp;
          o.launchPoints = launchPoints.current;
          o.power = power;
          lgtv.current = { ...lgtv.current, ...o };
        }

        for (const activity of activities) {
          const inputs = activity.inputs || {};
          if (inputs.tv === tvInput && inputs.avr === avrInput) {
            currentDevice.current = activity.defaultDevice;
            setCurrentActivity(activity.name);
            break;
          }
        }
      } catch (e) {}
    }; // onMessage

    for (const device of devices) {
      switch (device.type) {
        case "lgtv":
          MQTT.subscribe(`${Config.mqtt.lgtv}/${device.device}/status/power`, onMessage);
          MQTT.subscribe(`${Config.mqtt.lgtv}/${device.device}/status/foregroundApp`, onMessage);
          MQTT.subscribe(`${Config.mqtt.lgtv}/${device.device}/status/launchPoints`, onMessage);
          break;
        case "denon":
          denon.current = device.device;
          MQTT.subscribe(`${Config.mqtt.denon}/${device.device}/status/SI`, onMessage);
          break;
        case "tivo":
          tivo.current = device;
          break;
        case "appletv":
          appleTV.current = device.device;
          break;
        default:
          break;
      }
    }

    return () => {
      for (const device of devices) {
        switch (device.type) {
          case "lgtv":
            tvType = "lgtv";
            MQTT.unsubscribe(`${Config.mqtt.lgtv}/${device.device}/status/power`, onMessage);
            MQTT.unsubscribe(
              `${Config.mqtt.lgtv}/${device.device}/status/foregroundApp`,
              onMessage
            );
            MQTT.unsubscribe(`${Config.mqtt.lgtv}/${device.device}/status/launchPoints`);
            break;
          case "denon":
            MQTT.unsubscribe(`${Config.mqtt.denon}/${device.device}/status/SI`, onMessage);
            break;
          case "tivo":
            break;
          default:
            break;
        }
      }
    };
  }, []);

  const findTheater = () => {
    for (const t of Config.theaters) {
      if (t.title === title) {
        return t;
      }
    }
    return null;
  };

  const def = findTheater();
  if (!def) {
    return <div>Config.js error: Theater {title} not found</div>;
  }

  const devices = def.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
  }

  const activities = def.activities || [],
    activitiesMap = {};

  for (const activity of activities) {
    activitiesMap[activity.name] = activities;
  }

  const renderCurrentDevice = () => {
    if (currentDevice.current === "TiVo") {
      return <TiVo device={tivo.current} />;
    } else if (currentDevice.current === "Apple TV") {
      return <AppleTV device={appleTV.current} />;
    }
    return <div>Current Device: {currentDevice.current}</div>;
  };
  return (
    <ListGroup.Item style={{ display: "flex", textAlign: "center" }}>
      <div style={{ flex: 2 }}>
        {currentActivity}
        <br />
        {renderCurrentDevice()}
      </div>
      <div style={{ flex: 1 }}>
        TV: {tvInput.toUpperCase()}
        <br />
        AVR: {avrInput}
      </div>
    </ListGroup.Item>
  );
};

export default TheaterItem;
