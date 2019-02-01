import React, { Component } from "react";

import Config from "Config";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import MQTT from "lib/MQTT";

const types = ["battery", "temperature", "motion", "contact", "humidity"];

export default class SensorsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ padding: 20, marginTop: 10 }}>
        {Config.sensors.map(sensor => {
          return (
            <div>
              {sensor.topic}{" "}
              <span style={{ float: "right" }}>{sensor.type}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
