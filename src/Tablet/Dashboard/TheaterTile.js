import React, { useState, useEffect, useRef } from "react";

import Tile from "./Tile";
import AppleTV from "./Theater/AppleTV";
import TiVo from "./Theater/TiVo";
import Audio from "./Theater/Audio";

import MQTT from "lib/MQTT";

import Config from "Config";

// config
// denon, tv, settop, tivo
const TheaterTile = ({ title }) => {
  const [currentActivity, setCurrentActivity] = useState("All Off");

  const power = useRef("off");

  const appleTV = useRef(null);
  const tivo = useRef(null);
  const denon = useRef(null);
  const avrInput = useRef(null);
  const currentDevice = useRef("None");
  const lgtv = useRef({});
  const launchPoints = useRef(null);
  const foregroundApp = useRef(null);
  const tvInput = useRef("");

  const [active, setActive] = useState(null);

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

  let tvType = "unknown";

  useEffect(() => {
    const onMessage = (topic, message) => {
      if (~topic.indexOf("power")) {
        power.current = message;
      } else if (~topic.indexOf("launchPoints")) {
        try {
          launchPoints.current = JSON.parse(message);
        } catch (e) {
          launchPoints.current = message;
        }
      } else if (~topic.indexOf("foreground")) {
        try {
          foregroundApp.current = JSON.parse(message);
        } catch (e) {
          foregroundApp.current = message;
        }
      } else if (~topic.indexOf("SI")) {
        avrInput.current = message;
      }
      // determine TV input (e.g. HDMI1, HDMI2, NetFlix, etc.)
      if (power.current !== "on") {
        setCurrentActivity("All Off");
        setActive(null);
        return;
      }

      try {
        if (tvType === "lgtv" && launchPoints.current) {
          const lps = launchPoints.current,
            fg = foregroundApp.current,
            title = lps[fg.appId].title;
          const lp = title || "unknown";
          tvInput.current = lp.replace(/\s+/, "").toLowerCase();
          const o = Object.assign({}, deviceMap.lgtv);
          o.foregroundApp = foregroundApp.current;
          o.launchPoints = launchPoints.current;
          o.power = power.current;
          lgtv.current = { ...lgtv.current, ...o };
        }

        for (const activity of activities) {
          const inputs = activity.inputs || {};
          if (inputs.tv === tvInput.current && inputs.avr === avrInput.current) {
            currentDevice.current = activity.defaultDevice;
            setCurrentActivity(activity.name);
            setActive(activity);
            break;
          }
        }
      } catch (e) {}
    }; // onMessage
    for (const device of devices) {
      switch (device.type) {
        case "lgtv":
          tvType = "lgtv";
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

  const renderCurrentDevice = () => {
    if (currentDevice.current === "TiVo") {
      return <TiVo device={tivo.current} />;
    } else if (currentDevice.current === "Apple TV") {
      return <AppleTV device={appleTV.current} />;
    }
    return <div>Current Device: {currentDevice.current}</div>;
  };

  return active ? (
    <Tile width={2} height={2}>
      <div style={{ fontSize: 24, marginBottom: 0 }}>{currentActivity}</div>
      {renderCurrentDevice()}
      <Audio device={denon.current} />
    </Tile>
  ) : (
    <Tile width={2} height={2}>
      <div>Current Activity: {currentActivity}</div>
    </Tile>
  );
};
export default TheaterTile;
