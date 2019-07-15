import React, { useReducer, useRef, useEffect } from "react";

import { useFan } from "@/hooks/useSmartThings";

import Tile from "./Tile";
import { GiComputerFan } from "react-icons/gi";

const FanTile = ({ name }) => {
  const fan = useFan(name);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onClick = () => {

    let value = 25,
      lvl = Number(fan.level);

    if (fan.switch === "off") {
      lvl = 25;
    } else if (lvl < 34) {
      value = 50;
    } else if (lvl < 67) {
      value = 75;
    } else {
      value = 0;
    }

    if (value) {
      if (fan.switch !== "on") {
        fan.switch = "on";
        forceUpdate();
        // we need to delay a bit so the switch on takes
        setTimeout(() => {
          fan.level = value;
          forceUpdate();
        }, 100);
      } else {
        fan.level = value;
        forceUpdate();
      }
    } else {
      fan.switch = "off";
      forceUpdate();
    }
  };

  // render
  let value = "Off";
  if (fan.switch === "on") {
    const l = Number(fan.level);
    if (l < 34) {
      value = "Low";
    } else if (l < 67) {
      value = "Medium";
    } else {
      value = "High";
    }
  }

  return (
    <Tile width={1} height={1} onClick={onClick}>
      <div
        style={{
          textAlign: "center",
          color: fan.switch === "on" ? "yellow" : undefined,
        }}
      >
        <GiComputerFan size={24} style={{ marginBottom: 10 }} />
        <div>{name}</div>
        <div style={{ fontSize: 30 }}>{value}</div>
      </div>
    </Tile>
  );
};

//
export default FanTile;
