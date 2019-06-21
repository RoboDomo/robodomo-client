/**
 * hook to monitor Nest Protect (fire detector)
 */
import { useState, useEffect } from "react";

import MQTT from "@/lib/MQTT";
import useConfig from "@/hooks/useConfig";

const useProtect = sensor => {
  console.log("UP", sensor);
  const Config = useConfig();
  const device = sensor ? sensor.device : {};
  const protect_status_topic = Config.mqtt.nest + "/" + device + "/status/";

  console.log("sensor", sensor, "device", device);
  const topics = [
    "away",
    "battery_health",
    "co_alarm_state",
    "is_manual_test_active",
    "is_online",
    "last_manual_test_time",
    "smoke_alarm_state",
    "software_version",
    "ui_color_state",
  ];

  const [away, setAway] = useState("home");
  const [battery, setBattery] = useState("ok");
  const [co2, setCo2] = useState("ok");
  const [smoke, setSmoke] = useState("ok");
  const [testActive, setTestActive] = useState(false);
  const [online, setOnline] = useState(true);
  const [lastTest, setLastTest] = useState(null);
  const [softwareVersion, setSoftwareVersion] = useState("");
  const [uiColor, setUiColor] = useState(undefined);

  useEffect(() => {
    const handleStateChange = (topic, message) => {
      if (~topic.indexOf("away")) {
        setAway(message);
      } else if (~topic.indexOf("battery")) {
        setBattery(message);
      } else if (~topic.indexOf("co_alarm")) {
        setCo2(message);
      } else if (~topic.indexOf("manual_test_active")) {
        setTestActive(message);
      } else if (~topic.indexOf("is_online")) {
        setOnline(message);
      } else if (~topic.indexOf("last_manual_test")) {
        const d = new Date(message);
        setLastTest(d.toLocaleString());
      } else if (~topic.indexOf("smoke_alarm")) {
        setSmoke(message);
      } else if (~topic.indexOf("software_version")) {
        setSoftwareVersion(message);
      } else if (~topic.indexOf("ui_color")) {
        setUiColor(message);
      }
    };

    for (const topic of topics) {
      MQTT.subscribe(protect_status_topic + topic, handleStateChange);
    }
    return () => {
      for (const topic of topics) {
        MQTT.unsubscribe(protect_status_topic + topic, handleStateChange);
      }
    };
  }, [sensor, protect_status_topic, topics]);

  return {
    away: away,
    battery: battery,
    co2: co2,
    smoke: smoke,
    textActive: testActive,
    online: online,
    lastText: lastTest,
    softwareVersion: softwareVersion,
    uiColor: uiColor,
  };
};

//
export default useProtect;
