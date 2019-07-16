import React from "react";

import useConfig from "@/hooks/useConfig";
import useWeather from "@/hooks/useWeather";
import Temperature from "@/common/Temperature";
import Speed from "@/common/Speed";
import Tile from "./Tile";
import { FaFlag } from "react-icons/fa";

const WeatherTile = () => {
  const Config = useConfig();
  const metric = Config.metric;
  const location = (() => {
    for (const location of Config.weather.locations) {
      if (location.default) {
        return location;
      }
    }
    return Config.weather.locations[0];
  })();

  const weather = useWeather(location.device),
    { now } = weather;

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
        <div>{now.description}</div>
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
                fontSize: 44,
              }}
            >
              <Temperature value={now.temperature} />
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Temperature value={now.highTemperature} /> / <Temperature value={now.lowTemperature} />
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 5,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          <FaFlag style={{ fontSize: 32 }} /> {now.windDescShort} <Speed value={now.windSpeed} />
        </div>
      </div>
    </Tile>
  );
};

//
export default WeatherTile;
