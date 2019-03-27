import React, { useState, useEffect } from "react";

import Tile from "components/Tile";
import Config from "Config";
import MQTT from "lib/MQTT";
import { FaFlag } from "react-icons/fa";

const WeatherTile = () => {
  const [displayCity, setDisplayCity] = useState("");
  const [now, setNow] = useState({});
  const location = Config.weather.locations[0];

  useEffect(() => {
    const status_topic =
      Config.mqtt.weather + "/" + location.device + "/status/";
    const onStateChange = (topic, newValue) => {
      if (~topic.indexOf("now")) {
        setNow(newValue);
      } else if (~topic.indexOf("display_city")) {
        setDisplayCity(newValue);
      } else {
        console.log("invalid topic/value", topic, newValue);
      }
    };
    MQTT.subscribe(status_topic + "now", onStateChange);
    MQTT.subscribe(status_topic + "display_city", onStateChange);
    return () => {
      MQTT.unsubscribe(status_topic + "now", onStateChange);
      MQTT.unsubscribe(status_topic + "display_city", onStateChange);
    };
  }, []);

  if (!now.icon) {
    return (
      <Tile
        //backgroundColor="white"
        //color="blac,cick"
        width={2}
        height={2}
        onClick="weather"
      >
        {location.name}
      </Tile>
    );
  }
  return (
    <Tile
      //backgroundColor="white"
      //color="blac,cick"
      width={2}
      height={2}
      onClick="weather"
    >
      <div style={{ textAlign: "center" }}>
        <div>{displayCity}</div>
        <div
          style={{
            fontSize: 48,
            paddingRight: 10,
            marginBottom: 10
          }}
        >
          <img
            alt={now.icon}
            style={{
              verticalAlign: "middle",
              width: 96,
              height: 96
            }}
            src={"/img/Weather/icons/black/" + now.icon + ".svg"}
          />
          <div style={{ display: "inline", paddingTop: 10 }}>
            {now.current_temperature}&deg;F
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            marginTop: 5,
            marginBottom: 10,
            textAlign: "center"
          }}
        >
          <FaFlag style={{ fontSize: 32 }} /> {now.wind_direction}{" "}
          {now.current_wind} MPH
        </div>
      </div>
    </Tile>
  );
};
export default WeatherTile;
