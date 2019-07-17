import React, { useState, useRef } from "react";

import useConfig from "@/hooks/useConfig";
import useLGTV from "@/hooks/useLGTV";
import useDenon from "@/hooks/useDenon";
import useBravia from "@/hooks/useBravia";
import useAppleTV from "@/hooks/useAppleTV";

import Tile from "./Tile";
import AppleTV from "./Theater/AppleTV";
import TiVo from "./Theater/TiVo";
import Audio from "./Theater/Audio";

// config
// denon, tv, settop, tivo
const TheaterTile = ({ title }) => {
  const Config = useConfig();

  // first we need to find the theater in Config
  const findTheater = () => {
    for (const t of Config.theaters) {
      if (t.title === title) {
        return t;
      }
    }
    return null;
  };
  const def = findTheater();
  if (!def) {
    throw new Error(`TheaterTile: theater ${title} not found in Config`);
  }

  // create a hash map of device type => device config
  const devices = def.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
  }

  // get instances of the devices
  const lgtv = deviceMap.lgtv ? useLGTV(deviceMap.lgtv) : {},
    bravia = deviceMap.bravia ? useBravia(deviceMap.bravia) : {},
    avr = deviceMap.denon ? useDenon(deviceMap.denon) : {},
    appleTV = deviceMap.appletv ? useAppleTV(deviceMap.appletv.device) : {};
  //    tivo = deviceMap.tivo ? useTiVo(deviceMap.tivo) : {};

  const tv = lgtv.name ? lgtv : bravia;

  const currentDevice = useRef("None");

  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [active, setActive] = useState(null);

  // loop through activities and create a hashmap of name => activity definition
  // while we're looping, we can compare the TV and AVR input with the inputs in the
  // definition, to get the current activity
  const activities = def.activities || [],
    activitiesMap = {};

  for (const activity of activities) {
    activitiesMap[activity.name] = activities;
    const inputs = activity.inputs || {};
    if (inputs.tv === tv.input && inputs.avr === avr.input) {
      if (currentDevice.current === "None") {
        currentDevice.current = activity.defaultDevice;
      }
      if (currentActivity !== activity.name) {
        if (tv.power && avr.power) {
          setCurrentActivity(activity.name);
          setActive(activity);
        } else if (currentActivity !== "All Off") {
          setCurrentActivity("All Off");
          setActive(null);
        }
      }
      break;
    }
  }

  const renderCurrentDevice = () => {
    if (currentDevice.current === "TiVo") {
      return <TiVo device={deviceMap.tivo} />;
    } else if (currentDevice.current === "Apple TV") {
      return <AppleTV device={appleTV.device} />;
    } else if (currentDevice.current === "AppleTV") {
      return <AppleTV device={appleTV.device} />;
    } else {
      return <div>Current Device: {currentDevice.current}</div>;
    }
  };

  return active ? (
    <Tile width={2} height={2} onClick="theater">
      <div style={{ fontSize: 24, marginBottom: 0, textAlign: "center" }}>{currentActivity}</div>
      {renderCurrentDevice()}
      <Audio device={avr} />
    </Tile>
  ) : (
    <Tile width={2} height={2}>
      <div style={{ textAlign: "center" }}>Current Activity: {currentActivity}</div>
    </Tile>
  );
};

//
export default TheaterTile;
