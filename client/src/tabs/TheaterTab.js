import React, { useState, useEffect } from "react";

//import Config from "Config";

import { Row, Col } from "react-bootstrap";

import AudioControl from "components/theater/AudioControl";
import ActivitiesListGroup from "components/theater/ActivitiesListGroup";
import DevicesListGroup from "components/theater/DevicesListGroup";
import TheaterDevice from "components/theater/TheaterDevice";
import ButtonList from "components/theater/ButtonList";

import MQTT from "lib/MQTT";

export default ({ style, theater }) => {
  const [currentDevice, setCurrentDevice] = useState("None");
  const [currentActivity, setCurrentActivity] = useState("All Off");
  let power = null,
    tvInput = null,
    avrInput = null;

  const STORAGE_KEY = `theater-${theater.title}`;

  const getPersisted = () => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
      setCurrentActivity(s.currentActivity || s.activeActivity);
      setCurrentDevice(s.currentDevice || s.activeDevice);
    } catch (e) {
      setCurrentActivity(null);
      setCurrentDevice(null);
      persist();
    }
  };

  const persist = () => {
    try {
      const o = {
        currentActivity: currentActivity,
        currentDevice: currentDevice
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
    } catch (e) {
      console.log("persist", e.message, e.stack);
    }
  };

  // devices
  const devices = theater.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
  }
  const handleDeviceClick = device => {
    setCurrentDevice(device.name);
    persist();
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
    persist();
  };

  //  return null;
  //
  let tvType = "unknown";

  let launchPoints = null,
    foregroundApp = null,
    lgtv = {};

  const onMessage = (topic, message) => {
    if (~topic.indexOf("power")) {
      power = message;
    } else if (~topic.indexOf("foreground")) {
      foregroundApp = message;
    } else if (~topic.indexOf("launchPoints")) {
      launchPoints = message;
    } else if (~topic.indexOf("SI")) {
      avrInput = message;
    }

    // determine TV input (e.g. HDMI1, HDMI2, NetFlix, etc.)
    if (power !== "on") {
      return;
    }

    if (tvType === "lgtv") {
      if (launchPoints && foregroundApp && foregroundApp.appId.length) {
        tvInput = (launchPoints[foregroundApp.appId].title || "unknown")
          .replace(/\s+/, "")
          .toLowerCase();
      }
      lgtv = Object.assign({}, deviceMap.lgtv);
      lgtv.foregroundApp = foregroundApp;
      lgtv.launchPoints = launchPoints;
      lgtv.power = power;
    }

    for (const activity of activities) {
      const inputs = activity.inputs || {};
      if (inputs.tv === tvInput && inputs.avr === avrInput) {
        if (currentActivity !== activity.name) {
          setCurrentDevice(activity.defaultDevice);
          setCurrentActivity(activity.name);
          persist();
        }
      }
    }
  }; // onMessage

  useEffect(() => {
    getPersisted();
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
  }, []);

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
          tvInut={tvInput}
          avrInput={avrInput}
          onClick={handleDeviceClick}
        />
      </Col>
      <Col sm={10}>
        <Row>
          <Col sm={2} style={{ textAlign: "center" }}>
            <AudioControl />
          </Col>
          <Col sm={7} style={{ textAlign: "center" }}>
            <TheaterDevice
              currentDevice={currentDevice}
              lgtv={lgtv}
              deviceMap={deviceMap}
            />
          </Col>
          <Col sm={3} style={{ textAlign: "center" }}>
            <ButtonList theater={theater} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
