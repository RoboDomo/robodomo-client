import React, { Component } from "react";

import Tile from "components/Tile";

export default class DimmerTile extends Component {
  render() {
    return (
      <Tile width={1} height={1}>
        DIMMER
      </Tile>
    );
  }
}
