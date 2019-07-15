import React, { useRef } from "react";

import Tile from "./Tile";
import ClockTile from "./ClockTile";
import DimmerTile from "./DimmerTile";
import FanTile from "./FanTile";
import GarageDoorTile from "./GarageDoorTile";
import MacroTile from "./MacroTile";
import PoolTile from "./PoolTile";
import SpaTile from "./SpaTile";
import SwitchTile from "./SwitchTile";
import TheaterTile from "./TheaterTile";
import ThermostatTile from "./ThermostatTile";
import WeatherTile from "./WeatherTile";
import { IonGrid, IonCol, IonRow } from '@ionic/react';

const DashboardTab = ({ dashboard }) => {
  const tileDefinitions = dashboard.tiles;
  const tiles = useRef(null);

  if (!tiles.current) {
    let key = 0;
    tiles.current = tileDefinitions.map(tile => {
      switch (tile.type) {
        case "dimmer":
          return (
            <DimmerTile key={++key} name={tile.device}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </DimmerTile>
          );
        case "macro":
          return <MacroTile key={++key} label={tile.label} name={tile.name} />;
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
            <GarageDoorTile key={++key} config={tile}>
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
            <TheaterTile key={++key} title={tile.title}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </TheaterTile>
          );
        case "pool":
          return (
            <PoolTile key={++key} device={tile.controller}>
              <div>{tile.type}</div>
              <div>{tile.device}</div>
            </PoolTile>
          );
        case "spa":
          return (
            <SpaTile key={++key} device={tile.controller}>
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
  }

  return (
    <IonGrid>
      <IonRow justify-content-center align-items-center>
        <IonCol size="12">{tiles.current}</IonCol>
      </IonRow>
    </IonGrid>
  );
};
export default DashboardTab;

