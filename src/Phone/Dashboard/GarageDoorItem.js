import React, { useState, useEffect } from "react";
import useConfig from "@/hooks/useConfig";
import { ListGroup } from "react-bootstrap";

import MQTT from "@/lib/MQTT";

const GarageDoorItem = ({ config }) => {
  const Config = useConfig();
  const devices = Array.isArray(config.devices) ? config.devices : [config.devices];
  const preface = Config.mqtt.smartthings;

  const [doorSensors, setDoorSensors] = useState({});

  useEffect(() => {
    const onStateChange = (topic, newState) => {
      const newDoors = {};

      for (const device of devices) {
        if (topic.indexOf(device) !== -1) {
          newDoors[device] = newState;
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
  }, [devices, preface]);

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
    <ListGroup.Item
      style={{
        flexDirection: "column",
        padding: 5,
        textAlign: "center",
        backgroundColor: open ? "red" : undefined,
        color: open ? "white" : undefined,
      }}
    >
      {doors.map(function(door) {
        return (
          <div key={++key}>
            <span style={{ fontWeight: "bold" }}>{door.name}</span> {door.state}
          </div>
        );
      })}
    </ListGroup.Item>
  );
};

export default GarageDoorItem;
