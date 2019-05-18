import React, { useState, useEffect, useReducer, useRef } from "react";

//import Config from "Config";

import { Row, Col } from "react-bootstrap";

import AudioControl from "./AudioControl";
import ActivitiesListGroup from "./ActivitiesListGroup";
import DevicesListGroup from "./DevicesListGroup";
import TheaterDevice from "./TheaterDevice";
import ButtonList from "./ButtonList";

import MQTT from "lib/MQTT";
import MQTTScript from "lib/MQTTScript";

import useLGTV from "common/hooks/useLGTV";
import useDenon from "common/hooks/useDenon";

const TheaterTab = ({ style, theater }) => {
  const [currentDevice, setCurrentDevice] = useState("None");
  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [startingActivity, setStartingActivity] = useState(null);

  const avr = useRef(null);
  const tvType = useRef(null);

  // devices
  let config = null;
  //  const denon = useRef(null);
  const devices = theater.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
    if (device.type === "denon") {
      //      console.log("thaterTab", device);
      avr.current = useDenon({ ...device, debug: "TheaterTab" });
      config = device;
    }
  }
  if (!avr.current) {
    return null;
  }
  const [state, dispatch] = useReducer(avr.reducer, null);
  //    avr.reducer;
  const tv = useLGTV(deviceMap.lgtv);

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

  //  const launchPoints = useRef([]);

  useEffect(() => {
    for (const device of devices) {
      switch (device.type) {
        case "bravia":
          tvType.current = "bravia";
          console.log("----> subscribe bravia");
          //          MQTT.subscribe(`bravia/${device.device}/status/power`, handleMessage);
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
            //            MQTT.unsubscribe(
            //              `bravia/${device.device}/status/power`,
            //              handleMessage
            //            );
            break;
          default:
            break;
        }
      }
    };
  }, []); // power, currentDevice, avrInput]);

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
      if (inputs.tv === tv.input && inputs.avr === avr.current.input) {
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
    tv.power,
    avr.current.power,
    currentActivity,
    currentDevice,
    //    tvInput,
    tv.input,
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
        tv={tv}
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
          tvInput={tv.input}
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
