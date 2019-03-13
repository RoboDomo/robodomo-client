/**
 * MacroTile
 *
 * A tile that runs a macro when pressed.
 */
import React from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "components/Tile";
import { FaRunning } from "react-icons/fa";

const MacroTile = ({ config }) => {
  const label = config.label,
    name = config.name,
    topic = `${Config.mqtt.macros}/run`;

  const onClick = () => {
    MQTT.publish(topic, name);
    this.setState({ backgroundColor: "cyan" });
    setTimeout(() => {
      this.setState({ backgroundColor: undefined });
    }, 250);
  };

  return (
    <Tile>
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
