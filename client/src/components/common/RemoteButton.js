/**
 * <RmoteButton>
 *
 * RemoteButton implements a button for a remote control.  When pressed, it will
 * send props.message to props.topic via MQTT by default.  If props.onClick is present,
 * that method is called instead.  If props.mini is true, the button is rendered half width,
 * which is suitable for play/pause/rewind control button bar.  If props.bsStyle is "none", then
 * no button is rendered, but a div of button width is rendered instead; this allows rendering
 * of joystick buttons, for example.
 */
import React, { Component } from "react";

//import Config from "Config";

import { Button } from "react-bootstrap";
import MQTT from "lib/MQTT";

const style = {
  width: 100,
  height: 40,
  fontSize: 14
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
    console.log("onClick", this.topic, this.props.message);
    if (this.topic && this.props.message) {
      console.log(
        "MQTT.publish(" + this.topic + "," + this.props.message + ")"
      );
      MQTT.publish(this.topic, this.props.message);
    } else if (this.props.onClick) {
      this.props.onClick();
    }
  }
}
