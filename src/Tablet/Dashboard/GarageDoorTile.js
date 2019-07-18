import React from "react";
import { useContact } from "@/hooks/useSmartThings";

import Tile from "./Tile";

const GarageDoorTile = ({ config }) => {
  const devs = Array.isArray(config.devices) ? config.devices : [config.devices],
    devices = {};

  for (const d of devs) {
    devices[d] = useContact(d);
  }

  const doors = [];
  let open = false;

  for (const k of Object.keys(devices)) {
    doors.push({ ...devices[k], name: k.replace(/\s+Sensor/, "") });
    if (devices[k] === "open") {
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
          color: open ? "white" : undefined,
        }}
      >
        {doors.map(function(door) {
          return (
            <div key={++key}>
              <div style={{ fontWeight: "bold" }}>{door.name}</div>
              <div>{door.contact}</div>
            </div>
          );
        })}
      </div>
    </Tile>
  );
};

//
export default GarageDoorTile;
