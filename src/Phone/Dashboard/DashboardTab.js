import React from "react";
import { ListGroup } from "react-bootstrap";

import ClockItem from "./ClockItem";
import WeatherItem from "./WeatherItem";
import ThermostatItem from "./ThermostatItem";
import PoolItem from "./PoolItem";
import SpaItem from "./SpaItem";
import TheaterItem from "./TheaterItem";
import GarageDoorItem from "./GarageDoorItem";
import FanItem from "./FanItem";
import DimmerItem from "./DimmerItem";
import SwitchItem from "./SwitchItem";
import MacroItem from "./MacroItem";

const DashboardTab = ({ dashboard }) => {
  const renderTile = tile => {
    switch (tile.type) {
      case "theater":
        return <TheaterItem title={tile.title} />;
      case "spa":
        return <SpaItem device={tile.controller} />;
      case "pool":
        return <PoolItem device={tile.controller} />;
      case "thermostat":
        return <ThermostatItem device={tile.device} />;
      case "weather":
        return <WeatherItem location={tile.location} type={tile.type} />;
      case "clock":
        return <ClockItem />;
      case "garagedoor":
        return <GarageDoorItem config={tile} />;
      case "fan":
        return <FanItem name={tile.device} />;
      case "dimmer":
        return <DimmerItem name={tile.device} />;
      case "switch":
        return <SwitchItem name={tile.device} />;
      case "macro":
        return <MacroItem name={tile.name} label={tile.label} />;
      default:
        return (
          <ListGroup.Item>
            {tile.type} {tile.device} {tile.name}
          </ListGroup.Item>
        );
    }
    //
  };
  console.log("DashboardTab", dashboard);
  let key = 1;
  return (
    <div style={{ overflow: "scroll", height: "100vh", paddingBottom: 200 }}>
      <ListGroup>
        {dashboard.tiles.map(tile => {
          return <span key={key++}>{renderTile(tile)}</span>;
        })}
      </ListGroup>
    </div>
  );
};

export default DashboardTab;
