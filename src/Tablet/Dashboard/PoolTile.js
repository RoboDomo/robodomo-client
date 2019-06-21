import React from "react";

import Tile from "./Tile";

import useAutelis from "@/hooks/useAutelis";

const PoolTile = ({ device }) => {
  const autelis = useAutelis();

  const renderPool = () => {
    const renderControl = (ndx, text, big) => {
      const thingState = autelis[ndx];

      if (!thingState) {
        return null;
      }

      if (big) {
        return <div style={{ fontSize: 30 }}>{text}</div>;
      }

      return <div>{text}</div>;
    };

    if (on) {
      return (
        <div>
          {renderControl("pump", `Pool ${autelis.poolTemp}°F`, true)}
          {renderControl("pump", "Filter On")}
          {renderControl("cleaner", "Cleaner On")}
          {renderControl("waterfall", "Waterfall On")}
          {renderControl("poolHeat", "Pool Heat " + autelis.poolSetpoint)}
          {renderControl(
            "solarHeat",
            "Solar Heat " + (autelis.solarHeat ? autelis.solarTemp : "off")
          )}
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ fontSize: 60 }}>{"Pool Off"}</div>
        </div>
      );
    }
  };

  const on = autelis.pump,
    backgroundColor = on ? (autelis.poolHeat === "enabled" ? "red" : "green") : undefined,
    color = on ? "white" : undefined;

  return (
    <Tile
      backgroundColor={backgroundColor}
      color={color}
      width={2}
      height={1}
      onClick={() => {
        localStorage.setItem("autelis-radio", "pool");
        window.location.hash = "autelis";
      }}
    >
      <div style={{ textAlign: "center" }}>{renderPool()}</div>
    </Tile>
  );
};

//
export default PoolTile;
