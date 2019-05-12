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
  const [tvPower, setTVPower] = useState(false);
  const [avrPower, setAVRPower] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("None");
  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [startingActivity, setStartingActivity] = useState(null);
  const [avrInput, setAVRInput] = useState(null);
  const [tvInput, setTVInput] = useState(null);
  const [lgtv, setLGTV] = useState({});
  const [foregroundApp, setForegroundApp] = useState(null);

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

  const launchPoints = useRef([]);

  const handleMessage = (topic, message) => {
    if (~topic.indexOf("power")) {
      console.log("SET POWER ", message, message === "on");
      if (message === true || message === false) {
        setTVPower(message);
      } else {
        setTVPower(message === "on"); // message === "on");
      }
    } else if (~topic.indexOf("foreground")) {
      try {
        setForegroundApp(JSON.parse(message));
      } catch (e) {
        setForegroundApp(message);
      }
      console.log("foreground ", foregroundApp);
    } else if (~topic.indexOf("launchPoints")) {
      try {
        launchPoints.current = JSON.parse(message);
      } catch (e) {
        launchPoints.current = message;
      }
    } else if (~topic.indexOf("SI")) {
      setAVRInput(message);
    } else if (~topic.indexOf("PW")) {
      setAVRPower(message === "ON");
    }
  }; // handleMessage

  useEffect(() => {
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
          MQTT.subscribe(`denon/${device.device}/status/PW`, handleMessage);
          break;
        case "bravia":
          tvType.current = "bravia";
          console.log("----> subscribe bravia");
          MQTT.subscribe(`bravia/${device.device}/status/power`, handleMessage);
          break;
        default:
          break;
      }
    }

    return () => {
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
            MQTT.unsubscribe(`denon/${device.device}/status/SI`, handleMessage);
            MQTT.unsubscribe(`denon/${device.device}/status/PW`, handleMessage);
            break;
          default:
            break;
        }
      }
    };
  }, []); // power, currentDevice, avrInput]);

  useEffect(() => {
    console.log("xxx avrPower", avrPower);
    // determine TV input (e.g. HDMI1, HDMI2, NetFlix, etc.)
    if (avrPower === false) {
      setAVRInput("OFF");
    }
    if (!tvPower) {
      console.log("POWER IS OFF");
      setTVInput("OFF");
    }

    try {
      if (tvType.current === "lgtv") {
        const lps = launchPoints.current,
          fg = foregroundApp,
          title = lps[fg.appId].title;
        const lp = title || "unknown";
        setTVInput(tvPower ? lp.replace(/\s+/, "").toLowerCase() : "OFF");
        const o = Object.assign({}, deviceMap.lgtv);
        o.foregroundApp = foregroundApp;
        o.launchPoints = launchPoints.current;
        o.power = tvPower;
        o.tvInput = tvInput;
        setLGTV(o);
        //        setLGTV(prev => ({ ...prev, ...o }));
        console.log("o", o);
      } else {
      }
    } catch (e) {}

    let found = false;
    for (const activity of activities) {
      const inputs = activity.inputs || {};
      //        console.log("inputs", inputs.tv, tvInput, inputs.avr, avrInput);
      if (inputs.tv === tvInput && inputs.avr === avrInput) {
        if (currentActivity !== activity.name) {
          setCurrentDevice(prev => activity.defaultDevice);
          setCurrentActivity(prev => activity.name);
          console.log(
            "FOUND currentActivity",
            currentActivity,
            ":" + activity.name + ":"
          );
          found = true;
          break;
        }
      }
    }
    if (!found) {
      //      setCurrentActivity(tvInput);
      console.log(
        "NOT FOUND currentActivity",
        currentActivity,
        tvInput,
        avrInput
      );
    }
  }, [
    tvPower,
    avrPower,
    currentActivity,
    currentDevice,
    tvInput,
    avrInput,
    foregroundApp
  ]);

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
        tvInput={tvInput}
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
          tvInput={tvInput}
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
