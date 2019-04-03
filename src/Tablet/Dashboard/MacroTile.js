/**
 * MacroTile
 *
 * A tile that runs a macro when pressed.
 */
import React from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "./Tile";
import { FaRunning } from "react-icons/fa";

const MacroTile = ({ label, name }) => {
  const topic = `${Config.mqtt.macros}/run`;

  const onClick = () => {
    if (!name) {
      console.warn("MacroTile needs name prop");
    } else {
      MQTT.publish(topic, name);
    }
  };

  return (
    <Tile width={1} height={1}>
      <div style={{ flexDirection: "column" }} onClick={onClick}>
        <div style={{ fontSize: 24, textAlign: "center", marginBottom: 10 }}>
          <FaRunning size={24} />
        </div>
        <div style={{ textAlign: "center" }}>{"Macro"}</div>
        <div>{label}</div>
      </div>
    </Tile>
  );
};

export default MacroTile;
