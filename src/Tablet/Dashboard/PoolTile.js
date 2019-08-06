import React from "react";

import Tile from "./Tile";

import useAutelis from "@/hooks/useAutelis";

const PoolTile = ({ device }) => {
  const autelis = useAutelis();

  const renderPool = () => {
    const renderControl = (ndx, text, value) => {
      const thingState = autelis[ndx];

      if (!thingState) {
        return <div>{text} Off</div>;
      }
      if (!value) {
        return <div>{text} On</div>;
      }

      return (
        <div>
          {text} {value}
        </div>
      );
    };

    if (on) {
      return (
        <div>
          <div style={{ fontSize: 30 }}>{`Pool ${autelis.poolTemp}°F`}</div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              {renderControl("pump", "Filter")}
              {renderControl("cleaner", "Cleaner")}
              {renderControl("waterfall", "Waterfall")}
            </div>
            <div style={{ width: "50%" }}>
              {renderControl("poolHeat", "Pool Heat", autelis.poolSetpoint)}
              {renderControl("solarHeat", "Solar Heat", autelis.solarTemp)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ fontSize: 50 }}>{"Pool Off"}</div>
        </div>
      );
    }
  };

  const on = autelis.pump,
    color = on ? (autelis.poolHeat === "enabled" ? "danger" : "success") : undefined;

  return (
    <Tile
      color={color}
      width={2}
      height={2}
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
