import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "Config";

import MQTT from "lib/MQTT";
import RemoteButton from "components/common/RemoteButton";

export default class FanButton extends Component {
  constructor(props) {
    super(props);
    this.status_topic = Config.mqtt.smartthings + "/" + props.name + "/";
    this.status_topic_length = this.status_topic.length;
    this.set_topic = this.status_topic;

    this.onStateChange = this.onStateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const state = this.state,
      sw = state ? state.switch : "?";

    let value = "Off";
    if (sw === "on") {
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
      <div>
        <RemoteButton onClick={this.handleClick}>{value}</RemoteButton>
      </div>
    );
  }

  handleClick() {
    const state = this.state;

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
      setTimeout(() => {
        MQTT.publish(this.set_topic + "level/set", value);
      }, 250);
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

FanButton.propTypes = {
  name: PropTypes.string.isRequired
};
