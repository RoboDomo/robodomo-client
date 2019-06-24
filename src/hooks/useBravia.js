import { useState, useEffect, useReducer } from "react";
import useConfig from "@/hooks/useConfig";
import MQTT from "@/lib/MQTT";

const useBravia = config => {
  const Config = useConfig();

  const [power, setPower] = useState(false);
  const [input, setInput] = useState("Off");
  const [volume, setVolume] = useState(null);
  const [appsList, setAppsList] = useState(null);
  const [appsMap, setAppsMap] = useState(null);

  const handleAppsList = (topic, message) => {
    setAppsList(message);
  };

  const handleAppsMap = (topic, message) => {
    setAppsMap(message);
  };

  const handleInput = (topic, message) => {
    setInput(message);
  };

  const handlePower = (topic, message) => {
    setPower(message);
  };

  const handleVolume = (topic, message) => {
    setVolume(message.speaker);
    //    console.log("volume", message.speaker);
    //
  };

  useEffect(() => {
    const hostname = config.device;
    const status_topic = Config.mqtt.bravia + "/" + hostname + "/status/";

    MQTT.subscribe(status_topic + "appsList", handleAppsList);
    MQTT.subscribe(status_topic + "appsMap", handleAppsMap);
    MQTT.subscribe(status_topic + "input", handleInput);
    MQTT.subscribe(status_topic + "power", handlePower);
    MQTT.subscribe(status_topic + "volume", handleVolume);
    return () => {
      MQTT.unsubscribe(status_topic + "appsList", handleAppsList);
      MQTT.unsubscribe(status_topic + "appsMap", handleAppsMap);
      MQTT.unsubscribe(status_topic + "input", handleInput);
      MQTT.unsubscribe(status_topic + "power", handlePower);
      MQTT.unsubscribe(status_topic + "volume", handleVolume);
    };
  }, [Config.mqtt.bravia, config.device]);

  return {
    ...config,
    power: power,
    input: input,
    volume: volume,
    appsList: appsList,
    appsMap: appsMap,
  };
};

//
export default useBravia;
