import React from "react";

import Tile from "./Tile";
import Config from "Config";
import { FaFlag } from "react-icons/fa";

import useWeather from "common/hooks/useWeather";

const WeatherTile = () => {
  const location = Config.weather.locations[0];

  const weather = useWeather(location.device),
    { now } = weather;

  console.log("weather", weather, location);
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
        <div>{now.city}</div>
        <div
          style={{
            fontSize: 32,
            height: 72,
          }}
        >
          <img
            alt={now.iconName}
            style={{
              verticalAlign: "bottom",
              width: 80,
              height: 80,
            }}
            src={now.iconLink}
          />
          <div style={{ display: "inline" }}>
            <span
              style={{
                fontSize: 56,
              }}
            >
              {now.temperature}
              &deg;F
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {now.highTemperature}&deg;F / {now.lowTemperature}&deg;F
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 5,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <FaFlag style={{ fontSize: 32 }} /> {now.windDescShort} {now.windSpeed} MPH
        </div>
        <div>{now.description}</div>
      </div>
    </Tile>
  );
};
export default WeatherTile;
