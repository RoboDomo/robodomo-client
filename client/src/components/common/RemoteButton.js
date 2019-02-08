import React, { Component } from "react";

//import Config from "Config";

import { Button } from "react-bootstrap";
import MQTT from "lib/MQTT";

const style = {
  width: 90,
  height: 40
};

export default class RemoteButton extends Component {
  constructor(props) {
    super(props);
    this.bsStyle = props.bsStyle;
    this.topic = props.topic;
    this.message = props.message;
    this.style = Object.assign({}, style);
    if (props.mini) {
      this.style.width /= 2;
    }
    this.onClick = this.onClick.bind(this);
  }

  render() {
    if (this.bsStyle === "none") {
      return (
        <div
          style={{
            width: this.style.width,
            height: this.style.height,
            float: "left"
          }}
        >
          {this.props.children}
        </div>
      );
    }

    return (
      <Button bsStyle={this.bsStyle} style={this.style} onClick={this.onClick}>
        {this.props.children}
      </Button>
    );
  }
  onClick() {
    console.log("onClick", this.topic, this.message);
    if (this.topic && this.message) {
      console.log("MQTT.publish(" + this.topic + "," + this.message + ")");
      MQTT.publish(this.topic, this.message);
    } else if (this.props.onClick) {
      this.props.onClick();
    }
  }
}
