import React, { Component } from "react";

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || 1;
    this.height = props.height || 1;
    this.onClick = this.onClick.bind(this);
    this.timer = null;
    this.state = {
      pressed: false
    };
  }
  render() {
    const props = this.props,
      pressed = this.state.pressed;

    return (
      <div
        style={{
          width: this.width * 128,
          height: this.height * 128,
          border: pressed ? "4px inset white" : "4px outset white",
          gridColumnEnd: "span " + this.width,
          gridRowEnd: "span " + this.height,
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
        onClick={this.onClick}
      >
        {props.children}
      </div>
    );
  }

  onClick() {
    if (this.timer) {
      return;
    }
    this.timer = setTimeout(() => {
      this.timer = null;
      this.setState({ pressed: false });
      const ref = this.props.onClick;
      if (typeof ref === "string") {
        window.location.hash = ref;
      } else if (typeof ref === "function") {
        ref();
      }
    }, 500);
    this.setState({ pressed: true });
  }
}
