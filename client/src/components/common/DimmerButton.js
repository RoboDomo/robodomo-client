import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "Config";

import MQTT from "lib/MQTT";
import RemoteButton from "components/common/RemoteButton";

export default class DimmerButton extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    this.status_topic = Config.mqtt.smartthings + "/" + props.name + "/";
    this.status_topic_length = this.status_topic.length;
    this.set_topic = this.status_topic;

    this.onStateChange = this.onStateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const state = this.state,
      sw = state ? state.switch : "?";

    const value = sw === "on" ? Number(state.level) + "%" : "Off";
    return (
      <div>
        <RemoteButton onClick={this.handleClick}>{value}</RemoteButton>
      </div>
    );
  }

  handleClick() {
    const sw = this.state ? this.state.switch : "off";
    if (sw === "on") {
      this.setState({ switch: "off" });
      MQTT.publish(this.set_topic + "switch/set", "off");
    } else {
      this.setState({ switch: "on" });
      MQTT.publish(this.set_topic + "switch/set", "on");
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

DimmerButton.propTypes = {
  name: PropTypes.string.isRequired
};
