import React, { Component } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "components/Tile";
import { GiComputerFan } from "react-icons/gi";
export default class FanTile extends Component {
  constructor(props) {
    super(props);

    this.status_topic = Config.mqtt.smartthings + "/" + props.name + "/";
    this.status_topic_length = this.status_topic.length;
    this.set_topic = this.status_topic;

    this.onStateChange = this.onStateChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const state = this.state,
      props = this.props;

    if (!state || !state.switch) {
      return (
        <Tile width={1} height={1}>
          <GiComputerFan size={24} style={{ marginBottom: 10 }} />
          <div>...</div>
        </Tile>
      );
    }

    let value = "Off";
    if (state.switch === "on") {
      const level = Number(state.level);
      if (level < 34) {
        value = "Low";
      } else if (level < 67) {
        value = "Medium";
      } else {
        value = "High";
      }
    }
    return (
      <Tile width={1} height={1}>
        <div
          style={{
            textAlign: "center",
            color: state.switch === "on" ? "yellow" : undefined
          }}
          onClick={this.onClick}
        >
          <GiComputerFan size={24} style={{ marginBottom: 10 }} />
          <div>{props.name}</div>
          <div style={{ fontSize: 30 }}>{value}</div>
        </div>
      </Tile>
    );
  }

  onClick(e) {
    const state = this.state;

    e.stopPropagation();

    let value = 25,
      level = Number(state.level);

    if (state.switch === "off") {
      level = 25;
    } else if (level < 34) {
      value = 50;
    } else if (level < 67) {
      value = 75;
    } else {
      value = 0;
    }

    if (value) {
      this.setState({
        level: value,
        switch: "on"
      });
      MQTT.publish(this.set_topic + "switch/set", "on");
      MQTT.publish(this.set_topic + "level/set", value);
    } else {
      this.setState({
        switch: "off"
      });
      MQTT.publish(this.set_topic + "switch/set", "off");
    }
  }

  onStateChange(topic, newState) {
    const newVal = {};

    newVal[topic.substr(this.status_topic_length)] = newState;
    this.setState(newVal);
  }

  componentDidMount() {
    MQTT.subscribe(this.status_topic + "switch", this.onStateChange);
    MQTT.subscribe(this.status_topic + "level", this.onStateChange);
  }

  componentWillUnmount() {
    MQTT.unsubscribe(this.status_topic + "switch", this.onStateChange);
    MQTT.unsubscribe(this.status_topic + "level", this.onStateChange);
  }
}
