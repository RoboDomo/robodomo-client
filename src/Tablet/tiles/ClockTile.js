import React, { useState, useEffect } from "react";

import Tile from "components/Tile";
import Clock from "common/Clock";

const ClockTile = () => {
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
        <div style={{ fontSize: 40, width: "100%" }}>
          <Clock cb={d => setDate(d)} />
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

export default ClockTile;
