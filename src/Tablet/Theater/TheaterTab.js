import React, { useState, useEffect, useRef } from "react";

//import Config from "Config";

import { Row, Col } from "react-bootstrap";

import AudioControl from "./AudioControl";
import ActivitiesListGroup from "./ActivitiesListGroup";
import DevicesListGroup from "./DevicesListGroup";
import TheaterDevice from "./TheaterDevice";
import ButtonList from "./ButtonList";

import MQTT from "lib/MQTT";
import MQTTScript from "lib/MQTTScript";

const TheaterTab = ({ style, theater }) => {
  const subscribed = useRef(false);
  const [power, setPower] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("None");
  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [startingActivity, setStartingActivity] = useState(null);
  const [avrInput, setAVRInput] = useState(null);
  const [lgtv, setLGTV] = useState({});

  const tvType = useRef(null);

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
    console.log("handleClick device", device);
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

  const tvInput = useRef("");
  const launchPoints = useRef([]);
  const foregroundApp = useRef(null);

  useEffect(() => {
    const handleMessage = (topic, message) => {
      if (~topic.indexOf("power")) {
        //        console.log("SET POWER ", message, message === "on");
        if (message === true || message === false) {
          setPower(message);
        } else {
          setPower(message === "on"); // message === "on");
        }
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
    }; // handleMessage

    if (!subscribed.current) {
      console.warn("about to subscribe");
      for (const device of devices) {
        switch (device.type) {
          case "lgtv":
            tvType.current = "lgtv";
            MQTT.subscribe(`lgtv/${device.device}/status/power`, handleMessage);
            MQTT.subscribe(
              `lgtv/${device.device}/status/foregroundApp`,
              handleMessage
            );
            MQTT.subscribe(
              `lgtv/${device.device}/status/launchPoints`,
              handleMessage
            );
            break;
          case "denon":
            MQTT.subscribe(`denon/${device.device}/status/SI`, handleMessage);
            break;
          case "bravia":
            tvType.current = "bravia";
            console.log("----> subscribe bravia");
            MQTT.subscribe(
              `bravia/${device.device}/status/power`,
              handleMessage
            );
            break;
          default:
            break;
        }
      }
      subscribed.current = true;
    }

    return () => {
      if (subscribed.current) {
        console.warn("about to unsubscribe");
        for (const device of devices) {
          switch (device.type) {
            case "bravia":
              console.log("-----> unsubscribe bravia");
              MQTT.unsubscribe(
                `bravia/${device.device}/status/power`,
                handleMessage
              );
              break;
            case "lgtv":
              MQTT.unsubscribe(
                `lgtv/${device.device}/status/power`,
                handleMessage
              );
              MQTT.unsubscribe(
                `lgtv/${device.device}/status/foregroundApp`,
                handleMessage
              );
              MQTT.unsubscribe(
                `lgtv/${device.device}/status/launchPoints`,
                handleMessage
              );
              break;
            case "denon":
              MQTT.unsubscribe(
                `denon/${device.device}/status/SI`,
                handleMessage
              );
              break;
            default:
              break;
          }
        }
        subscribed.current = false;
      }
    };
  }, []); // power, currentDevice, avrInput]);

  useEffect(() => {
    console.warn("useEffect 2", power);
    // determine TV input (e.g. HDMI1, HDMI2, NetFlix, etc.)
    if (!power) {
      console.log("POWER IS OFF");
      //        setCurrentActivity("All Off");
      //        setCurrentDevice("NONE");
      return;
    }

    try {
      if (tvType.current === "lgtv") {
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
      } else {
      }
    } catch (e) {}

    for (const activity of activities) {
      const inputs = activity.inputs || {};
      //        console.log("inputs", inputs.tv, tvInput.current, inputs.avr, avrInput);
      if (inputs.tv === tvInput.current && inputs.avr === avrInput) {
        if (currentActivity !== activity.name) {
          setCurrentDevice(activity.defaultDevice);
          setCurrentActivity(activity.name);
          break;
        }
      }
    }
  }, [power, currentDevice, avrInput]);

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
    <Row style={{ marginTop: 4 }}>
      <Col sm={2}>
        <ActivitiesListGroup
          activities={activities}
          currentActivity={currentActivity}
          onClick={handleActivityClick}
        />
        <div style={{ height: 4 }} />
        <DevicesListGroup
          devices={devices}
          currentDevice={currentDevice}
          tvInput={tvInput.current}
          avrInput={avrInput}
          onClick={handleDeviceClick}
        />
      </Col>
      <Col sm={10}>
        <Row style={{ width: "100%", textAlign: "center" }}>
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

//
export default TheaterTab;
