import { useState, useEffect, useReducer } from "react";
import MQTT from "lib/MQTT";
import Config from "Config";

const useBravia = config => {
  const hostname = config.device;
  const status_topic = Config.mqtt.bravia + "/" + hostname + "/status/",
    set_topic = status_topic.replace("status", "set") + "command";

  const [power, setPower] = useState(false);
  const [input, setInput] = useState("Off");
  const [volume, setVolume] = useState(null);
  const [appsList, setAppsList] = useState(null);
  const [appsMap, setAppsMap] = useState(null);

  const reducer = (state, action) => {
    switch (action) {
      default:
        console.error("useBravia reducer invalid action", action);
    }
  };

  const handleAppsList = (topic, message) => {
    try {
      setAppsList(JSON.parse(message));
    } catch (e) {
      setAppsList(message);
    }
  };

  const handleAppsMap = (topic, message) => {
    try {
      setAppsMap(JSON.parse(message));
    } catch (e) {
      setAppsMap(message);
    }
  };

  const handleInput = (topic, message) => {
    setInput(message);
  };

  const handlePower = (topic, message) => {
    setPower(message);
  };

  const handleVolume = (topic, message) => {
    try {
      setVolume(JSON.parse(message));
    } catch (e) {
      setVolume(message);
    }
    //
  };

  useEffect(() => {
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
  }, []);

  const [, d] = useReducer(reducer);
  return {
    dispatch: d,
    power: power,
    input: input,
    volume: volume,
    appsList: appsList,
    appsMap: appsMap
  };
};

export default useBravia;
