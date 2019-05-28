import React from "react";

import Tile from "./Tile";

import useAutelis from "common/hooks/useAutelis";

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
    backgroundColor = on ? "red" : undefined,
    color = on ? "white" : undefined;

  const renderControl = (ndx, text, big) => {
    const thing = autelis[ndx];
    //        if (thing && state.spa !== 'on' ||  thing.toLowerCase() === 'off' ) {
    if (!thing) {
      return null;
    }
    if (big) {
      return <div style={{ fontSize: 30 }}>{text}</div>;
    }

    return <div>{text}</div>;
  };

  const renderSpa = () => {
    if (on) {
      return (
        <div>
          {renderControl("spa", `Spa ${autelis.spaTemp}°F`, true)}
          {renderControl("spaHeat", "Heat On")}
          {renderControl("jet", "Jets On")}
          {renderControl("blower", "Blower On")}
          {renderControl("spaLight", "Light On")}
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
      height={1}
      onClick={() => {
        localStorage.setItem("autelis-radio", "spa");
        window.location.hash = "poolcontrol";
      }}
      backgroundColor={backgroundColor}
      color={color}
    >
      <div style={{ textAlign: "center" }}>{renderSpa()}</div>
    </Tile>
  );
};

export default SpaTile;
