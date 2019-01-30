import React, { Component } from "react";

import Tile from "components/Tile";
import ClockTile from "tiles/ClockTile";
import DimmerTile from "tiles/DimmerTile";
import FanTile from "tiles/FanTile";
import GarageDoorTile from "tiles/GarageDoorTile";
import MacroTile from "tiles/MacroTile";
import PoolTile from "tiles/PoolTile";
import SpaTile from "tiles/SpaTile";
import SwitchTile from "tiles/SwitchTile";
import TheaterTile from "tiles/TheaterTile";
import ThermostatTile from "tiles/ThermostatTile";
import WeatherTile from "tiles/WeatherTile";

export default class DashboardTab extends Component {
  constructor(props) {
    super(props);
    this.dashboard = props.dashboard;
    this.key = this.dashboard.key;
    this.title = this.dashboard.title;
    this.tiles = this.dashboard.tiles;
  }
  render() {
    let key = 0;
    const tiles = this.tiles.map(tile => {
      switch (tile.type) {
        case "dimmer":
          return (
            <DimmerTile key={++key} name={tile.device}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </DimmerTile>
          );
        case "macro":
          return (
            <MacroTile key={++key} config={tile}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </MacroTile>
          );
        case "switch":
          return (
            <SwitchTile key={++key} name={tile.device}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </SwitchTile>
          );
        case "fan":
          return (
            <FanTile key={++key} name={tile.device}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </FanTile>
          );
        case "garagedoor":
          return (
            <GarageDoorTile key={++key}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </GarageDoorTile>
          );
        case "clock":
          return (
            <ClockTile key={++key}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </ClockTile>
          );
        case "weather":
          return (
            <WeatherTile key={++key}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </WeatherTile>
          );
        case "thermostat":
          return (
            <ThermostatTile key={++key} device={tile.device}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </ThermostatTile>
          );
        case "theater":
          return (
            <TheaterTile key={++key}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </TheaterTile>
          );
        case "pool":
          return (
            <PoolTile key={++key}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </PoolTile>
          );
        case "spa":
          return (
            <SpaTile key={++key}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </SpaTile>
          );
        default:
          return (
            <Tile width={1} height={1} key={++key}>
              <div>BAD BAD BAD</div>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </Tile>
          );
      }
    });
    return (
      <div
        style={{
          display: "inline-grid",
          gridTemplateColumns: "auto auto auto auto auto auto auto auto",
          gridTemplateRows: "auto auto auto auto",
          gridGap: 0,
          gridAutoRows: "minmax(256px, auto)",
          gridAutoFlow: "dense"
        }}
      >
        {tiles}
      </div>
    );
  }
}
