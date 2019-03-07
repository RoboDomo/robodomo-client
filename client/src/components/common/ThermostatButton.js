/**
 * ThermostatButton
 *
 * Component for upper right side of Theater screen, to display and control thermostat
 */
import React, { Component } from "react";

import Config from "Config";

import RemoteButton from "components/common/RemoteButton";
import { Glyphicon } from "react-bootstrap";

import MQTT from "lib/MQTT";

export default class ThermostatButton extends Component {
  constructor(props) {
    super(props);
    this.device = props.thermostat;
    this.weather = props.weather;
    this.timer = null;

    this.thermostat_status_topic =
      Config.mqtt.nest + "/" + this.device + "/status/";
    this.thermostat_status_topic_length = this.thermostat_status_topic.length;
    this.set_topic = this.thermostat_status_topic.replace("status", "set");

    this.onStateChange = this.onStateChange.bind(this);
    this.handleClickUp = this.handleClickUp.bind(this);
    this.handleClickDown = this.handleClickDown.bind(this);
    this.state = {};
  }

  render() {
    const state = this.state,
      w = state.now;
    if (!state.ambient_temperature_f || !state.target_temperature_f || !w) {
      return null;
    }

    return (
      <>
        <div style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
          {new Date().toLocaleTimeString()}
        </div>
        <div style={{ fontSize: 24, fontWeight: "bold" }}>
          <img
            style={{
              verticalAlign: "middle",
              width: 32,
              height: 32
            }}
            src={"/img/Weather/icons/black/" + w.icon + ".svg"}
            alt={w.icon}
          />
          <div style={{ display: "inline", paddingTop: 0 }}>
            {w.current_temperature}&deg; F
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: "bold" }}>
          Inside: {state.ambient_temperature_f}&deg;F
        </div>
        <RemoteButton onClick={this.handleClickUp}>
          <Glyphicon glyph="chevron-up" />
        </RemoteButton>
        <div style={{ fontSize: 32, textAlign: "center" }}>
          {state.target_temperature_f}&deg;F
        </div>
        <RemoteButton onClick={this.handleClickDown}>
          <Glyphicon glyph="chevron-down" />
        </RemoteButton>
      </>
    );
  }

  handleClickUp() {
    if (this.state && this.state.target_temperature_f) {
      const target_temperature = this.state.target_temperature_f + 1;
      this.setState({
        target_temperature_f: target_temperature
      });
      MQTT.publish(this.set_topic + "target_temperature_f", target_temperature);
    }
  }
  handleClickDown() {
    if (this.state && this.state.target_temperature_f) {
      const target_temperature = this.state.target_temperature_f - 1;
      this.setState({
        target_temperature_f: target_temperature
      });
      MQTT.publish(this.set_topic + "target_temperature_f", target_temperature);
    }
  }
  onStateChange(topic, newState) {
    const state = this.state || {},
      result = {};

    if (topic.startsWith(Config.mqtt.nest)) {
      const key = topic.substr(this.thermostat_status_topic_length);

      result[key] = newState;
      if (!this.weather_status_topic && state.postal_code) {
        const t = (this.weather_status_topic =
          Config.mqtt.weather + "/" + this.state.postal_code + "/status/");
        this.weather_status_topic_length = this.weather_status_topic.length;

        MQTT.subscribe(t + "now", this.onStateChange);
      }
    } else {
      const key = topic.substr(this.weather_status_topic_length);

      result[key] = newState;
    }
    this.setState(result);
  }

  componentDidMount() {
    MQTT.subscribe(
      this.thermostat_status_topic + "postal_code",
      this.onStateChange
    );
    MQTT.subscribe(
      this.thermostat_status_topic + "ambient_temperature_f",
      this.onStateChange
    );
    MQTT.subscribe(
      this.thermostat_status_topic + "target_temperature_f",
      this.onStateChange
    );
    MQTT.subscribe(
      this.thermostat_status_topic + "hvac_state",
      this.onStateChange
    );
    this.timer = setInterval(() => {
      this.setState({ timer: true });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    MQTT.unsubscribe(
      this.thermostat_status_topic + "postal_code",
      this.onStateChange
    );
    MQTT.unsubscribe(
      this.thermostat_status_topic + "ambient_temperature_f",
      this.onStateChange
    );
    MQTT.unsubscribe(
      this.thermostat_status_topic + "target_temperature_f",
      this.onStateChange
    );
    MQTT.unsubscribe(
      this.thermostat_status_topic + "hvac_state",
      this.onStateChange
    );
  }
}
