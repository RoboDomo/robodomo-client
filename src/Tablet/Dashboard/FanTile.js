import React, { useReducer } from "react";

import { useFan } from "@/hooks/useSmartThings";

import Tile from "./Tile";
import { GiComputerFan } from "react-icons/gi";

const FanTile = ({ name }) => {
  const fan = useFan(name);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onClick = e => {
    e.stopPropagation();

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
        fan.level = value;
        fan.switch = "on";
        forceUpdate();
        // we need to delay a bit so the switch on takes
        setTimeout(() => {
          forceUpdate();
        }, 100);
      } else {
        fan.level = value;
        forceUpdate();
      }
    } else {
      fan.level = value;
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
    <Tile width={1} height={1} color={fan.switch === "on" ? "warning" : undefined}>
      <div
        style={{
          textAlign: "center",
        }}
        onClick={onClick}
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
