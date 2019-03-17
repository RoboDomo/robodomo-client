/**
 * ThermostatButton
 *
 * Component for upper right side of Theater screen, to display and control thermostat
 */
import React, { useState, useEffect } from "react";

import Config from "Config";

import RemoteButton from "components/common/RemoteButton";
import { Glyphicon } from "react-bootstrap";

import MQTT from "lib/MQTT";

const ThermostatButton = ({ thermostat, weather }) => {
  const [timer, setTimer] = useState(null);
  const [date, setDate] = useState(new Date());
  const [weather_status_topic, setWeatherStatusTopic] = useState(null);
  const [postalCode, setPostalCode] = useState(0);
  const [ambientTemperature, setAmbientTemperature] = useState(72);
  const [targetTemperature, setTargetTemperature] = useState(72);
  const [hvacState, setHVACState] = useState("off");
  const [now, setNow] = useState({});

  const thermostat_status_topic =
      Config.mqtt.nest + "/" + thermostat + "/status/",
    set_topic = thermostat_status_topic.replace("status", "set");

  const onStateChange = (topic, newState) => {
    if (~topic.indexOf("postal_code")) {
      setPostalCode(newState);
    } else if (~topic.indexOf("ambient_temperature_f")) {
      setAmbientTemperature(newState);
    } else if (~topic.indexOf("target_temperature_f")) {
      setTargetTemperature(newState);
    } else if (~topic.indexOf("hvac_state")) {
      setHVACState(newState);
    } else if (~topic.indexOf("weather")) {
      setNow(newState);
    } else {
      console.log("invalid topic/state", topic, newState);
    }
  };

  useEffect(() => {
    MQTT.subscribe(thermostat_status_topic + "postal_code", onStateChange);
    MQTT.subscribe(
      thermostat_status_topic + "ambient_temperature_f",
      onStateChange
    );
    MQTT.subscribe(
      thermostat_status_topic + "target_temperature_f",
      onStateChange
    );
    MQTT.subscribe(thermostat_status_topic + "hvac_state", onStateChange);
    let t = setInterval(() => {
      setDate(new Date());
    }, 1000);
    setTimer(t);

    return () => {
      if (weather_status_topic) {
        MQTT.unsubscribe(weather_status_topic, onStateChange);
      }
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      MQTT.unsubscribe(thermostat_status_topic + "postal_code", onStateChange);
      MQTT.unsubscribe(
        thermostat_status_topic + "ambient_temperature_f",
        onStateChange
      );
      MQTT.unsubscribe(
        thermostat_status_topic + "target_temperature_f",
        onStateChange
      );
      MQTT.unsubscribe(thermostat_status_topic + "hvac_state", onStateChange);
    };
  }, []);

  const handleClickDown = () => {
    const target_temperature = targetTemperature - 1;
    setTargetTemperature(target_temperature);
    MQTT.publish(set_topic + "target_temperature_f", target_temperature);
  };

  const handleClickUp = () => {
    const target_temperature = targetTemperature + 1;
    setTargetTemperature(target_temperature);
    MQTT.publish(
      set_topic +
        "targhttps://www.amazon.com/gp/product/B07DK6CDC8/ref=ppx_yo_dt_b_asin_title_o05_s01?ie=UTF8&psc=1et_temperature_f",
      target_temperature
    );
  };

  if (!weather_status_topic && postalCode) {
    const t = Config.mqtt.weather + "/" + postalCode + "/status/now";
    setWeatherStatusTopic(t);
    console.log("weather", t);
    MQTT.subscribe(t, onStateChange);
  }

  // got these colors by inspecting the react-nest component
  let backgroundColor, color;
  switch (hvacState) {
    case "off":
    default:
      break;
    case "heating":
      backgroundColor = "rgb(227, 99, 4)";
      color = "white";
      break;
    case "cooling":
      backgroundColor = "rgb(0, 122, 241)";
      color = "white";
      break;
  }
  return (
    <>
      <div style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
        {date.toLocaleTimeString()}
      </div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>
        <img
          style={{
            verticalAlign: "middle",
            width: 32,
            height: 32
          }}
          src={"/img/Weather/icons/black/" + now.icon + ".svg"}
          alt={now.icon}
        />
        <div style={{ display: "inline", paddingTop: 0 }}>
          {now.current_temperature}&deg; F
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: "bold" }}>
        Inside: {ambientTemperature}&deg;F
      </div>
      <RemoteButton onClick={handleClickUp}>
        <Glyphicon glyph="chevron-up" />
      </RemoteButton>
      <div
        style={{
          fontSize: 32,
          textAlign: "center",
          color: color,
          backgroundColor: backgroundColor,
          width: 96,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {targetTemperature}&deg;F
      </div>
      <RemoteButton onClick={handleClickDown}>
        <Glyphicon glyph="chevron-down" />
      </RemoteButton>
    </>
  );
};
export default ThermostatButton;
