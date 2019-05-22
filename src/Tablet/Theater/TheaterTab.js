import React, { useState, useEffect, useRef } from "react";

import { Row, Col } from "react-bootstrap";

import AudioControl from "./AudioControl";
import ActivitiesListGroup from "./ActivitiesListGroup";
import DevicesListGroup from "./DevicesListGroup";
import TheaterDevice from "./TheaterDevice";
import ButtonList from "./ButtonList";

import MQTTScript from "lib/MQTTScript";

import useLGTV from "common/hooks/useLGTV";
import useBravia from "common/hooks/useBravia";
import useDenon from "common/hooks/useDenon";

const TheaterTab = ({ style, theater }) => {
  const [currentDevice, setCurrentDevice] = useState("None");
  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [startingActivity, setStartingActivity] = useState(null);

  const avr = useRef(null);
  const tv = useRef(null);

  // devices
  const devices = theater.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
    switch (device.type) {
      case "denon":
        avr.current = useDenon({ ...device, debug: "TheaterTab" });
        break;
      case "lgtv":
        tv.current = useLGTV({ ...device, debug: "TheaterTab" });
        break;
      case "bravia":
        tv.current = useBravia({ ...device, debug: "TheaterTab" });
        break;
      default:
        break;
    }
  }
  if (!avr.current) {
    return null;
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

  useEffect(() => {
    // determine TV input (e.g. HDMI1, HDMI2, NetFlix, etc.)
    //    if (avr.power === false) {
    //      setAVRInput("OFF");
    //    }
    //    if (!tv.power) {
    //      console.log("POWER IS OFF");
    //            setTVInput("OFF");
    //    }

    //    try {
    //      if (tvType.current === "lgtv") {
    //        const lps = tv.launchPoints.current,
    //          fg = tv.foregroundApp,
    //          title = lps[fg.appId].title;
    //        const lp = title || "unknown";
    //        setTVInput(tvPower ? lp.replace(/\s+/, "").toLowerCase() : "OFF");
    //        const o = Object.assign({}, deviceMap.lgtv);
    //        o.foregroundApp = foregroundApp;
    //        o.launchPoints = launchPoints.current;
    //        o.power = tvPower;
    //        o.tvInput = tvInput;
    //        setLGTV(o);
    //                setLGTV(prev => ({ ...prev, ...o }));
    //      } else {
    //      }
    //    } catch (e) {}

    let found = false;
    for (const activity of activities) {
      const inputs = activity.inputs || {};
      //        console.log("inputs", inputs.tv, tvInput, inputs.avr, avrInput);
      if (inputs.tv === tv.current.input && inputs.avr === avr.current.input) {
        if (currentActivity !== activity.name) {
          setCurrentDevice(prev => activity.defaultDevice);
          setCurrentActivity(prev => activity.name);
          //          console.log(
          //            "FOUND currentActivity",
          //            currentActivity,
          //            ":" + activity.name + ":"
          //          );
          found = true;
          break;
        }
      }
    }
    if (!found) {
      //      setCurrentActivity(tvInput);
      //      console.log(
      //        "NOT FOUND currentActivity",
      //        currentActivity,
      //        tv.input,
      //        avr.current.input
      //      );
    }
  }, [
    //uutvPower,
    tv.current.power,
    avr.current.power,
    currentActivity,
    currentDevice,
    //    tvInput,
    tv.current.input,
    avr.current.input
    //    foregroundApp
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
        avr={avr.current}
        tv={tv.current}
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
          tvInput={tv.current.input}
          avrInput={avr.current.input}
          onClick={handleDeviceClick}
        />
      </Col>
      <Col sm={10}>
        <Row style={{ width: "100%", textAlign: "center" }}>
          <Col sm={2} style={{ textAlign: "center" }}>
            <AudioControl avr={avr.current} />
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
