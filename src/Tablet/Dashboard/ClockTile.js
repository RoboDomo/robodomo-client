import React, { useState } from "react";

import Config from "Config";
import Tile from "./Tile";
import Clock from "common/Clock";
import useWeather from "common/hooks/useWeather";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ClockTile = () => {
  const [date, setDate] = useState(new Date());

  const weather = useWeather(Config.weather.locations[0].device);
  if (!weather || !weather.astronomy) {
    return null;
  }
  const sunrise = new Date(weather.astronomy.sunrise * 1000)
      .toLocaleTimeString()
      .replace(":00 ", " "),
    sunset = new Date(weather.astronomy.sunset * 1000).toLocaleTimeString().replace(":00 ", " ");

  return (
    <Tile width={2} height={2} readOnly>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 20 }}>
          {dayNames[date.getDay()]} {date.toLocaleDateString()}
        </div>
        <div style={{ fontSize: 64, width: "100%" }}>
          <Clock cb={d => setDate(d)} ampm={false} military={false} seconds="small" />
        </div>
        <div>Sunrise: {sunrise}</div>
        <div>Sunset: {sunset}</div>
        <div style={{ fontSize: 8 }}>
          {window.innerWidth} x {window.innerHeight}
        </div>
      </div>
    </Tile>
  );
};

export default ClockTile;
