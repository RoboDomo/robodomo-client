/**
 * Tab to display/conrol Nest Protect (CO2/Fire detector)
 */

import React, { useState, useEffect } from "react";
import { Glyphicon } from "react-bootstrap";

import MQTT from "lib/MQTT";

import Config from "Config";

// device, name
const ProtectTab = ({ sensor }) => {
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
    "ui_color_state"
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

  const GOOD = <Glyphicon style={{ color: "green" }} glyph="ok" />,
    BAD = <Glyphicon style={{ color: "red" }} glyph="remove" />;

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
  }, []);
  const style = { backgroundColor: uiColor, fontSize: 20, padding: 10 };
  return (
    <div style={{ padding: 20 }}>
      <div style={style}>
        <h1>{sensor.name} Nest Protect</h1>
        <h2>Software Version: {softwareVersion}</h2>
        <div>
          {testActive ? "TEST ACTIVE" : "Last Manual Test: " + lastTest}
        </div>
      </div>
      <h1>You are {away.toUpperCase()}</h1>
      <div style={{ fontSize: 30 }}>
        <div>{online ? GOOD : BAD} Online</div>
        <div>{battery ? GOOD : BAD} Battery</div>
        <div>{co2 ? GOOD : BAD} Co2</div>
        <div>{smoke ? GOOD : BAD} Smoke</div>
      </div>
    </div>
  );
};
export default ProtectTab;
