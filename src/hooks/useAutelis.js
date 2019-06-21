import { useState, useEffect } from "react";

import useConfig from "@/hooks/useConfig";
import MQTT from "@/lib/MQTT";

const topics = [
  "pump",
  "spa",
  "spaTemp",
  "poolTemp",
  "poolSetpoint",
  "spaSetpoint",
  "cleaner",
  "waterfall",
  "poolLight",
  "spaLight",
  "jet",
  "blower",
  "spaHeat",
  "poolHeat",
  "solarHeat",
  "solarTemp",
];

const useAutelis = () => {
  const Config = useConfig();

  // general
  const [pump, setPump] = useState(false);
  const [cleaner, setCleaner] = useState(false);
  const [solarHeat, setSolarHeat] = useState(false);
  const [solarTemp, setSolarTemp] = useState(60);
  // pool
  const [waterfall, setWaterfall] = useState(false);
  const [poolLight, setPoolLight] = useState(false);
  const [poolTemp, setPoolTemp] = useState(60);
  const [poolHeat, setPoolHeat] = useState(false);
  const [poolSetpoint, setPoolSetpoint] = useState(60);
  // spa
  const [spaLight, setSpaLight] = useState(false);
  const [spa, setSpa] = useState(false);
  const [spaTemp, setSpaTemp] = useState(60);
  const [spaHeat, setSpaHeat] = useState(false);
  const [spaSetpoint, setSpaSetpoint] = useState(60);
  const [jets, setJets] = useState(false);
  const [blower, setBlower] = useState(false);

  useEffect(() => {
    const handleStateChange = (topic, message) => {
      const autelis = Config.autelis,
        backward = autelis.deviceMap.backward;
      const status_topic = `${Config.mqtt.autelis}/status/`;
      const key = backward[topic.substr(status_topic.length)];
      const isOn = m => m === "true" || m === "on" || m === "enabled";

      switch (key) {
        case "pump":
          setPump(isOn(message));
          break;
        case "spa":
          setSpa(isOn(message));
          break;
        case "cleaner":
          setCleaner(isOn(message));
          break;
        case "waterfall":
          setWaterfall(isOn(message));
          break;
        case "poolLight":
          setPoolLight(isOn(message));
          break;
        case "jet":
          setJets(isOn(message));
          break;
        case "blower":
          setBlower(isOn(message));
          break;
        case "spaLight":
          setSpaLight(isOn(message));
          break;
        case "spaHeat":
          setSpaHeat(isOn(message));
          break;
        case "poolHeat":
          setPoolHeat(isOn(message));
          break;
        case "solarHeat":
          setSolarHeat(isOn(message));
          break;
        case "solarTemp":
          setSolarTemp(Number(message));
          break;
        case "spaTemp":
          setSpaTemp(Number(message));
          break;
        case "poolTemp":
          setPoolTemp(Number(message));
          break;
        case "spaSetpoint":
          setSpaSetpoint(Number(message));
          break;
        case "poolSetpoint":
          setPoolSetpoint(Number(message));
          break;
        default:
          console.log("====> Unhandled state change", topic, message, key);
          break;
      }
    };

    const autelis = Config.autelis,
      forward = autelis.deviceMap.forward,
      status_topic = `${Config.mqtt.autelis}/status/`;

    for (const key of topics) {
      MQTT.subscribe(status_topic + forward[key], handleStateChange);
    }

    return () => {
      for (const key of topics) {
        MQTT.unsubscribe(status_topic + forward[key], handleStateChange);
      }
    };
  }, [Config.autelis, Config.mqtt.autelis]);

  return {
    pump: pump,
    cleaner: cleaner,
    solarHeat: solarHeat,
    solarTemp: solarTemp,
    waterfall: waterfall,
    poolLight: poolLight,
    poolTemp: poolTemp,
    poolHeat: poolHeat,
    poolSetpoint: poolSetpoint,
    spaLight: spaLight,
    spa: spa,
    spaTemp: spaTemp,
    spaHeat: spaHeat,
    spaSetpoint: spaSetpoint,
    jet: jets,
    jets: jets,
    blower: blower,
  };
};

//
export default useAutelis;
