import React, { Component } from "react";

import { Button } from "react-bootstrap";

const style = {
  width: 90,
  height: 40
};

export default class RemoteButton extends Component {
  constructor(props) {
    super(props);
    this.bsStyle = props.bsStyle;
    this.style = Object.assign({}, style);
    if (props.mini) {
      this.style.width /= 2;
    }
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
      <Button bsStyle={this.bsStyle} style={this.style}>
        {this.props.children}
      </Button>
    );
  }
}
