import React, { Component } from "react";

import Config from "Config";

import MQTT from "lib/MQTT";

import { Row, Col, Panel } from "react-bootstrap";

const types = [
  "contact",
  "motion",
  "battery",
  "temperature",
  "illuminance",
  "humidity"
];

export default class SensorsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onStateChange = this.onStateChange.bind(this);
  }

  renderType(type) {
    let key = 0;
    const state = this.state;

    return Config.sensors.map(sensor => {
      if (sensor.type !== type) {
        return null;
      }
      return (
        <div key={"type" + key++}>
          {sensor.name}
          <span style={{ float: "right" }}>{state[sensor.topic]}</span>
        </div>
      );
    });
  }

  renderCard(type) {
    return (
      <Col sm={4} style={{ marginTop: 20 }}>
        <Panel>
          <Panel.Heading>{type.toUpperCase()}</Panel.Heading>
          <Panel.Body>{this.renderType(type)}</Panel.Body>
        </Panel>
      </Col>
    );
  }

  render() {
    let col = 0;
    return (
      <div style={{ padding: 20, marginTop: 10 }}>
        <Row>
          {this.renderCard(types[col++])}
          {this.renderCard(types[col++])}
          {this.renderCard(types[col++])}
        </Row>
        <Row>
          {this.renderCard(types[col++])}
          {this.renderCard(types[col++])}
          {this.renderCard(types[col++])}
        </Row>
      </div>
    );
  }

  onStateChange(topic, newState) {
    const changed = Object.assign({}, this.state);
    changed[topic] = newState;
    this.setState(changed);
  }

  componentDidMount() {
    for (const sensor of Config.sensors) {
      MQTT.subscribe(sensor.topic, this.onStateChange);
    }
  }

  componentWillUnmount() {
    console.log("unmount");
    for (const sensor of Config.sensors) {
      MQTT.unsubscribe(sensor.topic, this.onStateChange);
      //      console.log("sensor", sensor);
    }
  }
}
