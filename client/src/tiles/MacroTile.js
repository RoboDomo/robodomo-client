import React, { Component } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "components/Tile";
import { FaRunning } from "react-icons/fa";

export default class MacroTile extends Component {
  constructor(props) {
    super(props);
    this.config = props.config;
    this.label = this.config.label;
    this.name = this.config.name;
    this.topic = `${Config.mqtt.macros}/run`;
    this.onClick = this.onClick.bind(this);

    this.state = { backgroundColor: "white" };
  }

  render() {
    //backgroundColor={this.state.backgroundColor}
    return (
      <Tile>
        <div style={{ flexDirection: "column" }} onClick={this.onClick}>
          <div style={{ fontSize: 24, textAlign: "center", marginBottom: 10 }}>
            <FaRunning size={24} />
          </div>
          <div style={{ textAlign: "center" }}>{"Macro"}</div>
          <div>{this.config.label}</div>
        </div>
      </Tile>
    );
  }

  onClick() {
    MQTT.publish(this.topic, this.name);
    this.setState({ backgroundColor: "cyan" });
    setTimeout(() => {
      this.setState({ backgroundColor: undefined });
    }, 250);
  }
}
