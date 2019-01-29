import React, { Component } from "react";

import Tile from "components/Tile";

export default class FanTile extends Component {
  render() {
    return (
      <Tile width={1} height={1}>
        FAN
      </Tile>
    );
  }
}
