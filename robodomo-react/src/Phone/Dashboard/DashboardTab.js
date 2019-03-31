import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

import ClockItem from "Dashboard/ClockItem";
import WeatherItem from "Dashboard/WeatherItem";
import ThermostatItem from "Dashboard/ThermostatItem";
import PoolItem from "Dashboard/PoolItem";
import SpaItem from "Dashboard/SpaItem";
import TheaterItem from "Dashboard/TheaterItem";
import GarageDoorItem from "Dashboard/GarageDoorItem";
import FanItem from "Dashboard/FanItem";
import DimmerItem from "Dashboard/DimmerItem";
import SwitchItem from "Dashboard/SwitchItem";
import MacroItem from "Dashboard/MacroItem";

const DashboardTab = ({ dashboard }) => {
  const renderTile = tile => {
    console.log("renderTile", tile);
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
        console.warn("macro tile", tile);
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
          console.log("tile", tile);
          return <span key={key++}>{renderTile(tile)}</span>;
        })}
      </ListGroup>
    </div>
  );
};

export default DashboardTab;
