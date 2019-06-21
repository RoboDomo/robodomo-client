import React, { useState, useEffect } from "react";
import useConfig from "@/hooks/useConfig";

import { Badge } from "react-bootstrap";
import { FaCheck, FaWindowClose, FaHome, FaRoad } from "react-icons/fa";

import MQTT from "@/lib/MQTT";

// device, name
const ProtectTab = ({ sensor }) => {
  const Config = useConfig();
  const device = sensor.device;
  const protect_status_topic = Config.mqtt.nest + "/" + device + "/status/";

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

  const GOOD = <FaCheck style={{ color: "green" }} />,
    BAD = <FaWindowClose style={{ color: "red" }} />,
    HOME = <FaHome style={{ color: "green" }} />,
    AWAY = <FaRoad style={{ color: "red" }} />;

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
  }, [protect_status_topic, topics]);

  const style = { backgroundColor: uiColor, fontSize: 16, padding: 10 };
  return (
    <div style={{ margin: 0, paddingLeft: 20 }}>
      <div style={style}>
        <h3>
          {sensor.name} Nest Protect <Badge variant="secondary">{softwareVersion}</Badge>
        </h3>
        <div>{testActive ? "TEST ACTIVE" : "Last Manual Test: " + lastTest}</div>
      </div>
      <h1>
        {away === "home" ? HOME : AWAY} You are {away}
      </h1>
      <div style={{ fontSize: 30 }}>
        <div>{online ? GOOD : BAD} Online</div>
        <div>{battery ? GOOD : BAD} Battery</div>
        <div>{co2 ? GOOD : BAD} Co2</div>
        <div>{smoke ? GOOD : BAD} Smoke</div>
      </div>
    </div>
  );
};

//
export default ProtectTab;
