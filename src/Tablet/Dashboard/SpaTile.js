import React from "react";

import Tile from "./Tile";

import useAutelis from "@/hooks/useAutelis";

const SpaTile = ({ device }) => {
  const autelis = useAutelis();

  const isOn = thing => {
    const control = autelis[thing];

    if (!control) {
      return false;
    }
    if (control === true) {
      return control;
    }
    return control.toLowerCase() === "on";
  };

  const on = isOn("spa") || isOn("spaHeat") || isOn("jet") || isOn("blower") || isOn("spaLight"),
    color = on ? "danger" : undefined;

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

  const renderSpa = () => {
    if (on) {
      return (
        <div>
          <div style={{ fontSize: 30 }}>{`Spa ${autelis.spaTemp}°F`}</div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              {renderControl("spaHeat", "Heat")}
              {renderControl("jet", "Jets")}
            </div>
            <div style={{ width: "50%" }}>
              {renderControl("blower", "Blower")}
              {renderControl("spaLight", "Light")}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ fontSize: 60 }}>{"Spa Off"}</div>
        </div>
      );
    }
  };

  return (
    <Tile
      width={2}
      height={2}
      onClick={() => {
        localStorage.setItem("autelis-radio", "spa");
        window.location.hash = "autelis";
      }}
      color={color}
    >
      <div style={{ textAlign: "center" }}>{renderSpa()}</div>
    </Tile>
  );
};

export default SpaTile;
