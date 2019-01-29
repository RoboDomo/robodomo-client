import React, { Component } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "Tile";
import NumberInput from "form/NumberInput";
import Thermostat from "react-nest-thermostat";
import { Form } from "react-bootstrap";

const topics = [
  "away",
  "ambient_temperature_f",
  "target_temperature_f",
  "hvac_state",
  "has_leaf"
];

export default class ThermostatTile extends Component {
  constructor(props) {
    super(props);
    this.device = props.device;

    this.status_topic = Config.mqtt.nest + "/" + this.device + "/status/";
    this.status_topic_length = this.status_topic.length;
    this.set_topic = this.status_topic.replace("status", "set");

    this.onStateChange = this.onStateChange.bind(this);
    this.setTargetTemperature = this.setTargetTemperature.bind(this);
  }

  render() {
    if (!this.state || !this.state.target_temperature_f) {
      return (
        <Tile width={2} height={2}>
          Updating...
        </Tile>
      );
    }
    const thermostat = this.state,
      ambient_temperature = thermostat.ambient_temperature_f;

    return (
      <Tile width={2} height={2}>
        <div
          style={{
            textAlign: "center",
            marginTop: 0
          }}
        >
          <div style={{ marginBottom: 8, fontSize: 18, fontWeight: "bold" }}>
            {"Inside: " + ambient_temperature}&deg; F
          </div>
          <Thermostat
            style={{ textAlign: "center " }}
            width="150px"
            height="150px"
            away={Boolean(thermostat.away !== "home")}
            ambientTemperature={thermostat.ambient_temperature_f}
            targetTemperature={thermostat.target_temperature_f}
            hvacMode={thermostat.hvac_state}
            leaf={thermostat.has_leaf}
          />
          <Form horizontal style={{ marginTop: 10 }}>
            <NumberInput
              value={thermostat.target_temperature_f}
              onValueChange={this.setTargetTemperature}
            />
          </Form>
        </div>
      </Tile>
    );
  }

  onStateChange(topic, newState) {
    const key = topic.substr(this.status_topic_length),
      newValue = {};

    newValue[key] = newState;
    this.setState(newValue);
  }

  componentDidMount() {
    const status_topic = this.status_topic;

    topics.forEach(topic => {
      MQTT.subscribe(status_topic + topic, this.onStateChange);
    });
  }

  componentWillUnmount() {
    const status_topic = this.status_topic;

    topics.forEach(topic => {
      MQTT.unsubscribe(status_topic + topic, this.onStateChange);
    });
  }

  setTargetTemperature(temp) {
    MQTT.publish(this.set_topic + "/target_temperature_f", temp);
  }
}
