import React from "react";

import Tile from "./Tile";
import Config from "Config";
import { FaFlag } from "react-icons/fa";

import useWeather from "common/hooks/useWeather";

const WeatherTile = () => {
  const location = Config.weather.locations[0];

  const weather = useWeather(location.device),
    { now, display_city } = weather;

  if (!now.icon) {
    return (
      <Tile width={2} height={2} onClick="weather">
        {location.name}
      </Tile>
    );
  }

  return (
    <Tile width={2} height={2} onClick="weather">
      <div style={{ textAlign: "center" }}>
        <div>{display_city}</div>
        <div
          style={{
            fontSize: 32,
            paddingRight: 10,
            marginBottom: 10,
          }}
        >
          <img
            alt={now.icon}
            style={{
              verticalAlign: "middle",
              width: 96,
              height: 96,
            }}
            src={"/img/Weather/icons/black/" + now.icon + ".svg"}
          />
          <div style={{ display: "inline", paddingTop: 10 }}>
            <span style={{ fontSize: 64 }}>{now.current_temperature}</span>&deg;F
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 5,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <FaFlag style={{ fontSize: 32 }} /> {now.wind_direction} {now.current_wind} MPH
        </div>
      </div>
    </Tile>
  );
};
export default WeatherTile;
