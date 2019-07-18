import React from "react";

import { useDimmer } from "@/hooks/useSmartThings";

import Tile from "./Tile";

import { TiAdjustBrightness } from "react-icons/ti";

const DimmerTile = ({ name }) => {
  const dimmer = useDimmer(name);

  const onClick = e => {
    e.stopPropagation();

    if (dimmer.switch === "on") {
      dimmer.switch = "off";
    } else {
      dimmer.switch = "on";
    }
  };

  const style =
    dimmer.switch === "off"
      ? {
          color: undefined,
          value: "Off",
        }
      : {
          color: "yellow",
          value: `${dimmer.level}%`,
        };

  return (
    <Tile width={1} height={1}>
      <div style={{ textAlign: "center", color: style.color }} onClick={onClick}>
        <TiAdjustBrightness size={24} style={{ marginBottom: 10 }} />
        <div style={{ fontWeight: "normal" }}>{name}</div>
        <div style={{ fontSize: 30 }}>{style.value}</div>
      </div>
    </Tile>
  );
};

//
export default DimmerTile;
