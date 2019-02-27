/**
 * MQTTButton
 *
 * A simple button that publishes a topic/message when clicked.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "Config";

import MQTT from "lib/MQTT";
import RemoteButton from "components/common/RemoteButton";

export default class MQTTButton extends Component {
  constructor(props) {
    super(props);
    this.name = props.children || props.name;
    this.topic = Config.mqtt.macros + "/run";
    this.message = props.name;

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div>
        <RemoteButton onClick={this.handleClick}>{this.name}</RemoteButton>
      </div>
    );
  }

  handleClick() {
    MQTT.publish(this.topic, this.message);
  }
}

MQTTButton.propTypes = {
  name: PropTypes.string.isRequired
};
