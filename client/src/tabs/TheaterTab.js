import React, { useState, useEffect, useRef } from "react";

//import Config from "Config";

import { Row, Col } from "react-bootstrap";

import AudioControl from "components/theater/AudioControl";
import ActivitiesListGroup from "components/theater/ActivitiesListGroup";
import DevicesListGroup from "components/theater/DevicesListGroup";
import TheaterDevice from "components/theater/TheaterDevice";
import ButtonList from "components/theater/ButtonList";

import MQTT from "lib/MQTT";
import MQTTScript from "lib/MQTTScript";

const TheaterTab = ({ style, theater }) => {
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
    setCurrentDevice(device.name);
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
    console.log("handleClick", activity.name, activity.script);
  };

  let tvType = "unknown";

  const tvInput = useRef("");
  const launchPoints = useRef([]);
  const foregroundApp = useRef(null);

  useEffect(() => {
    const onMessage = (topic, message) => {
      if (~topic.indexOf("power")) {
        setPower(true); // message === "on");
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
        console.log("POWER OFF");
        return;
      }

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
    if (startingActivity) {
      return (
        <MQTTScript
          script={startingActivity.script}
          onComplete={() => {
            setStartingActivity(null);
          }}
        />
      );
      //      return <div>Starting {startingActivity.name}</div>;
    }
    return (
      <TheaterDevice
        currentDevice={currentDevice}
        tvInput={tvInput.current}
        avrInput={avrInput}
        lgtv={lgtv}
        deviceMap={deviceMap}
      />
    );
  };

  return (
    <Row style={{ marginTop: 20 }}>
      <Col sm={2}>
        <ActivitiesListGroup
          activities={activities}
          currentActivity={currentActivity}
          onClick={handleActivityClick}
        />
        <DevicesListGroup
          devices={devices}
          currentDevice={currentDevice}
          tvInput={tvInput.current}
          avrInput={avrInput}
          onClick={handleDeviceClick}
        />
      </Col>
      <Col sm={10}>
        <Row>
          <Col sm={2} style={{ textAlign: "center" }}>
            <AudioControl device={denon.current} />
          </Col>
          <Col sm={7} style={{ textAlign: "center" }}>
            {renderDevice()}
          </Col>
          <Col sm={3} style={{ textAlign: "center" }}>
            <ButtonList theater={theater} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default TheaterTab;
