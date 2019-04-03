import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "./Tile";

const GarageDoorTile = ({ config }) => {
  const devices = Array.isArray(config.devices)
    ? config.devices
    : [config.devices];
  const preface = Config.mqtt.smartthings;

  const [doorSensors, setDoorSensors] = useState({});

  useEffect(() => {
    const onStateChange = (topic, newState) => {
      const newDoors = {};

      for (const device of devices) {
        if (topic.indexOf(device) !== -1) {
          newDoors[device] = newState;
          //        } else {
          //          newDoors[device] = doorSensors[device];
        }
      }
      setDoorSensors(prev => ({ ...prev, ...newDoors }));
    };

    for (const device of devices) {
      MQTT.subscribe(`${preface}/${device}/contact`, onStateChange);
    }
    return () => {
      for (const device of devices) {
        MQTT.unsubscribe(`${preface}/${device}/contact`, onStateChange);
      }
    };
  }, []);

  const doors = [];
  let open = false;

  for (const k of Object.keys(doorSensors)) {
    doors.push({ name: k.replace(/\s+Sensor/, ""), state: doorSensors[k] });
    if (doorSensors[k] === "open") {
      open = true;
    }
  }
  let key = 0;
  return (
    <Tile width={1} height={1} readOnly>
      <div
        style={{
          flexDirection: "column",
          padding: 5,
          textAlign: "center",
          backgroundColor: open ? "red" : undefined,
          color: open ? "white" : undefined
        }}
      >
        {doors.map(function(door) {
          return (
            <div key={++key}>
              <span style={{ fontWeight: "bold" }}>{door.name}</span>
              <br />
              {door.state}
            </div>
          );
        })}
      </div>
    </Tile>
  );
};
export default GarageDoorTile;
