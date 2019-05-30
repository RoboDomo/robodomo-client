/**
 * ThermostatButton
 *
 * Component for upper right side of Theater screen, to display and control thermostat
 */
import React, { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import RemoteButton from "common/RemoteButton";
import Clock from "common/Clock";

import MQTT from "lib/MQTT";

import Config from "Config";

import useWeather from "common/hooks/useWeather";

const ThermostatButton = ({ thermostat }) => {
  const [postalCode, setPostalCode] = useState(0);
  const [ambientTemperature, setAmbientTemperature] = useState(72);
  const [targetTemperature, setTargetTemperature] = useState(72);
  const [hvacState, setHVACState] = useState("off");
  //  const [now, setNow] = useState({});

  const weather = useWeather(postalCode);
  const thermostat_status_topic = Config.mqtt.nest + "/" + thermostat + "/status/",
    set_topic = thermostat_status_topic.replace("status", "set");

  const handleStateChange = (topic, newState) => {
    if (~topic.indexOf("postal_code")) {
      setPostalCode(newState);
    } else if (~topic.indexOf("ambient_temperature_f")) {
      setAmbientTemperature(newState);
    } else if (~topic.indexOf("target_temperature_f")) {
      setTargetTemperature(newState);
    } else if (~topic.indexOf("hvac_state")) {
      setHVACState(newState);
    } else {
      console.log("invalid topic/state", topic, newState);
    }
  };

  useEffect(() => {
    MQTT.subscribe(thermostat_status_topic + "postal_code", handleStateChange);
    MQTT.subscribe(thermostat_status_topic + "ambient_temperature_f", handleStateChange);
    MQTT.subscribe(thermostat_status_topic + "target_temperature_f", handleStateChange);
    MQTT.subscribe(thermostat_status_topic + "hvac_state", handleStateChange);

    return () => {
      MQTT.unsubscribe(thermostat_status_topic + "postal_code", handleStateChange);
      MQTT.unsubscribe(thermostat_status_topic + "ambient_temperature_f", handleStateChange);
      MQTT.unsubscribe(thermostat_status_topic + "target_temperature_f", handleStateChange);
      MQTT.unsubscribe(thermostat_status_topic + "hvac_state", handleStateChange);
    };
  }, [thermostat_status_topic]);

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
        <Clock />
      </div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>
        <img
          style={{
            verticalAlign: "middle",
            width: 32,
            height: 32,
          }}
          src={"/img/Weather/icons/black/" + weather.now.icon + ".svg"}
          alt={weather.now.icon}
        />
        <div style={{ display: "inline", paddingTop: 0 }}>
          {weather.now.current_temperature}&deg; F
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: "bold" }}>Inside: {ambientTemperature}&deg;F</div>
      <RemoteButton onClick={handleClickUp}>
        <FaChevronUp />
      </RemoteButton>
      <div
        style={{
          fontSize: 32,
          textAlign: "center",
          color: color,
          backgroundColor: backgroundColor,
          width: 96,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {targetTemperature}&deg;F
      </div>
      <RemoteButton onClick={handleClickDown}>
        <FaChevronDown />
      </RemoteButton>
    </>
  );
};

//
export default ThermostatButton;
