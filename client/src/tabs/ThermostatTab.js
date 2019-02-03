import React, { Component } from "react";

import Config from "Config";

import {
  ToggleButton,
  ToggleButtonGroup,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

import Thermostat from "react-nest-thermostat";

import MQTT from "lib/MQTT";

import { FaAngleRight, FaAngleUp, FaAngleDown } from "react-icons/fa";

const thermostatTopics = [
  "device",
  "name",
  "structure_name",
  "postal_code",
  "away",
  "ambient_temperature_f",
  "target_temperature_f",
  "hvac_state",
  "has_leaf",
  "humidity",
  "time_to_target",
  "hvac_mode"
];

const weatherTopics = ["now", "forecast"];

export default class ThermostatTab extends Component {
  constructor(props) {
    super(props);

    this.thermostat = props.config;
    this.device = this.thermostat.device;
    this.name = this.thermostat.name;
    this.thermostat_status_topic =
      Config.mqtt.nest + "/" + this.device + "/status/";
    this.thermostat_status_topic_length = this.thermostat_status_topic.length;
    this.set_topic = this.thermostat_status_topic.replace("status", "set");

    this.state = null;

    this.onStateChange = this.onStateChange.bind(this);

    this.setTargetTemperature = this.setTargetTemperature.bind(this);
    this.adjustTemperature = this.adjustTemperature.bind(this);
    this.hvacModeChange = this.hvacModeChange.bind(this);
  }
  render() {
    const thermostat = this.state ? this.state.thermostat : {},
      weather = this.state ? this.state.weather : {},
      now = weather ? weather.now : {};

    if (!thermostat || !now) {
      return null;
    }
    return (
      <Row style={{ marginTop: 6 }}>
        <Col sm={3}>
          <ListGroup>
            <ListGroupItem>
              Presence
              <span style={{ float: "right" }}>{thermostat.away}</span>
            </ListGroupItem>
            <ListGroupItem>
              Ambient Temperature
              <span style={{ float: "right" }}>
                {thermostat.ambient_temperature_f}&deg;F
              </span>
            </ListGroupItem>
            <ListGroupItem>
              Ambient Humidity
              <span style={{ float: "right" }}>{thermostat.humidity}%</span>
            </ListGroupItem>
            <ListGroupItem>
              Mode
              <span style={{ float: "right" }}>{thermostat.hvac_mode}</span>
            </ListGroupItem>
            <ListGroupItem>
              Operating State
              <span style={{ float: "right" }}>{thermostat.hvac_state}</span>
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem>
              {thermostat.structure_name}
              <span style={{ float: "right" }}>{thermostat.postal_code}</span>
            </ListGroupItem>
            <ListGroupItem>
              Outside Temperature
              <span style={{ float: "right" }}>
                {now.current_temperature}&deg;F
              </span>
            </ListGroupItem>
            <ListGroupItem>
              Outside Humidity
              <span style={{ float: "right" }}>{now.current_humidity}%</span>
            </ListGroupItem>
            <ListGroupItem>
              Conditions
              <span style={{ float: "right" }}>{now.conditions}</span>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col sm={6}>
          <div style={{ textAlign: "center", fontSize: 48 }}>
            <Thermostat
              style={{ textAlign: "center " }}
              width="400px"
              height="400px"
              away={Boolean(thermostat.away !== "home")}
              ambientTemperature={thermostat.ambient_temperature_f}
              targetTemperature={thermostat.target_temperature_f}
              hvacMode={thermostat.hvac_state}
              leaf={thermostat.has_leaf}
            />
            <br />
            <ToggleButtonGroup
              onChange={this.hvacModeChange}
              type="radio"
              size="lg"
              name="hvac"
              value={thermostat.hvac_mode}
            >
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="off">
                Off
              </ToggleButton>
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="heat">
                Heat
              </ToggleButton>
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="cool">
                Cool
              </ToggleButton>
              <ToggleButton
                style={{ width: 85, fontSize: 14 }}
                value="heat-cool"
              >
                Heat-Cool
              </ToggleButton>
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="Eco">
                Eco
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Col>
        <Col sm={3}>
          <ListGroup>
            <ListGroupItem>
              Target Temperature
              <span style={{ float: "right" }}>
                {thermostat.target_temperature_f}&deg;F
              </span>
            </ListGroupItem>
            <ListGroupItem>
              Time To Target
              <span style={{ float: "right" }}>
                {thermostat.time_to_target}
              </span>
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem onClick={() => this.adjustTemperature(-2)}>
              <FaAngleDown /> Adjust{" "}
              <span style={{ float: "right" }}>-2 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.adjustTemperature(-1)}>
              <FaAngleDown /> Adjust{" "}
              <span style={{ float: "right" }}>-1 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.adjustTemperature(1)}>
              <FaAngleUp /> Adjust{" "}
              <span style={{ float: "right" }}>+1 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.adjustTemperature(2)}>
              <FaAngleUp /> Adjust{" "}
              <span style={{ float: "right" }}>+2 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.setTargetTemperature(82)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>82 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.setTargetTemperature(79)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>78 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.setTargetTemperature(75)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>75 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.setTargetTemperature(72)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>72 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => this.setTargetTemperature(70)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>70 &deg;</span>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    );
  }
  onStateChange(topic, newState) {
    const state = this.state || {};

    if (topic.startsWith(Config.mqtt.nest)) {
      const key = topic.substr(this.thermostat_status_topic_length),
        thermostat = state.thermostat || {};

      thermostat[key] = newState;
      this.setState({ thermostat: thermostat });
      if (!this.weather_status_topic && thermostat.postal_code) {
        const t = (this.weather_status_topic =
          Config.mqtt.weather + "/" + thermostat.postal_code + "/status/");
        this.weather_status_topic_length = this.weather_status_topic.length;

        weatherTopics.forEach(topic => {
          MQTT.subscribe(t + topic, this.onStateChange);
        });
      }
    } else {
      const key = topic.substr(this.weather_status_topic_length),
        weather = state.weather || {};

      weather[key] = newState;
      this.setState({ weather: weather });
    }
  }

  componentDidMount() {
    const status_topic = this.thermostat_status_topic;

    setTimeout(() => {
      thermostatTopics.forEach(topic => {
        MQTT.subscribe(status_topic + topic, this.onStateChange);
      });
    });
  }

  componentWillUnmount() {
    const status_topic = this.thermostat_status_topic;

    if (this.weather_status_topic) {
      const t =
        Config.mqtt.weather +
        "/" +
        this.state.thermostat.postal_code +
        "/status/";

      weatherTopics.forEach(topic => {
        MQTT.unsubscribe(t + topic, this.onStateChange);
      });
    }

    thermostatTopics.forEach(topic => {
      MQTT.unsubscribe(status_topic + topic, this.onStateChange);
    });
  }

  hvacModeChange(mode) {
    MQTT.publish(this.set_topic + "/hvac_mode", mode);
    //    this.state.thermostat.hvac_mode = mode;
    //    this.setState(this.state);
  }

  adjustTemperature(temp) {
    const state = this.state,
      thermostat = state ? state.thermostat : null;
    if (thermostat) {
      MQTT.publish(
        this.set_topic + "/target_temperature_f",
        thermostat.target_temperature_f + temp
      );
    }
  }

  setTargetTemperature(temp) {
    MQTT.publish(this.set_topic + "/target_temperature_f", temp);
  }
}
