import React, { Component } from "react";

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || 1;
    this.height = props.height || 1;
  }
  render() {
    const props = this.props;

    return (
      <div
        style={{
          width: this.width * 128,
          height: this.height * 128,
          border: "4px outset grey",
          gridColumnEnd: "span " + this.width,
          gridRowEnd: "span " + this.height,
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {props.children}
      </div>
    );
  }
}
