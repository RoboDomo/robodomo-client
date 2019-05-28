import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

import Config from "Config";

import MQTT from "lib/MQTT";

const WeatherItem = tile => {
  const [displayCity, setDisplayCity] = useState("");
  const [now, setNow] = useState({});

  useEffect(() => {
    const onStateChange = (topic, newValue) => {
      if (~topic.indexOf("now")) {
        setNow(newValue);
      } else if (~topic.indexOf("display_city")) {
        setDisplayCity(newValue);
      } else {
        console.log("invalid topic/value", topic, newValue);
      }
    };
    const status_topic = Config.mqtt.weather + "/" + tile.location + "/status/";
    MQTT.subscribe(status_topic + "now", onStateChange);
    MQTT.subscribe(status_topic + "display_city", onStateChange);
    return () => {
      MQTT.unsubscribe(status_topic + "now", onStateChange);
      MQTT.unsubscribe(status_topic + "display_city", onStateChange);
    };
  }, [tile.location]);
  return (
    <ListGroup.Item>
      <div style={{ textAlign: "center" }}>{displayCity}</div>
      <div style={{ fontSize: 18, whiteSpace: "nowrap" }}>
        <img
          alt={now.icon}
          style={{
            verticalAlign: "middle",
            width: 32,
            height: 32,
          }}
          src={"/img/Weather/icons/black/" + now.icon + ".svg"}
        />
        {now.conditions} {now.current_temperature}&deg;F{" "}
        <span className="float-right" style={{ whiteSpace: "nowrap" }}>
          {now.current_wind} MPH {now.wind_direction}
        </span>
      </div>
    </ListGroup.Item>
  );
};

export default WeatherItem;
