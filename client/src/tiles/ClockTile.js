import React, { useState, useEffect } from "react";
import Config from "Config.js";

import Tile from "components/Tile";

export default () => {
  const [date, setDate] = useState(new Date());

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const tileSize = Config.screenSize === "small" ? 1 : 2,
    hr = date.getHours(),
    hour = hr > 12 ? hr - 12 : hr,
    min = String(date.getMinutes()),
    minutes = min.length === 1 ? "0" + min : min,
    sec = String(date.getSeconds()),
    seconds = sec.length === 1 ? "0" + sec : sec,
    time = (hour || "12") + ":" + minutes;

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <Tile width={2} height={2} readOnly>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 37 * tileSize, width: "100%" }}>
          {time}
          <span style={{ fontSize: 20 * tileSize }}>{seconds}</span>
        </div>
        <div style={{ fontSize: 20 }}>{dayNames[date.getDay()]}</div>
        <div style={{ fontSize: 20 }}>{date.toLocaleDateString()}</div>
        <div style={{ fontSize: 8 }}>
          {window.innerWidth} x {window.innerHeight}
        </div>
      </div>
    </Tile>
  );
};
