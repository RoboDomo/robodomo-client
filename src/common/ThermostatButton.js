/**
 * ThermostatButton
 *
 * Component for upper right side of Theater screen, to display and control thermostat
 */
import React, { useEffect, useReducer, useState, useRef } from "react";
import useConfig from "@/hooks/useConfig";
import useWeather from "@/hooks/useWeather";
import useThermostat from "@/hooks/useThermostat";
import thermostatReducer from "@/hooks/reducers/thermostatReducer";

import DelayedTask from "@/lib/DelayedTask";

import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import RemoteButton from "@/common/RemoteButton";
import Clock from "@/common/Clock";

const ThermostatButton = ({ device }) => {
  const Config = useConfig();
  const thermostat = useThermostat(device);
  const delayedTask = useRef(null);

  const [, dispatch] = useReducer(thermostatReducer, { device: device });

  const [targetTemperature, setTargetTemperature] = useState(72);
  const newTarget = useRef(72);

  const postalCode = Config.weather.locations[0].device;
  const weather = useWeather(postalCode);

  useEffect(() => {
    if (!delayedTask.current && thermostat) {
      setTargetTemperature(thermostat.target_temperature_f);
    }
  }, [thermostat]);

  const handleClickDown = () => {
    newTarget.current = targetTemperature - 1;
    setTargetTemperature(newTarget.current);
    if (delayedTask.current) {
      delayedTask.current.defer(2000);
    } else {
      delayedTask.current = new DelayedTask(() => {
        dispatch({ type: "target_temp", value: newTarget.current });
        delayedTask.current = null;
      }, 2000);
    }
  };

  const handleClickUp = () => {
    newTarget.current = targetTemperature + 1;
    setTargetTemperature(newTarget.current);
    if (delayedTask.current) {
      delayedTask.current.defer(2000);
    } else {
      delayedTask.current = new DelayedTask(() => {
        dispatch({ type: "target_temp", value: newTarget.current });
        delayedTask.current = null;
      }, 2000);
    }
  };

  if (!thermostat) {
    return null;
  }

  // got these colors by inspecting the react-nest component
  let backgroundColor, color;
  switch (thermostat.hvacState) {
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
            verticalAlign: "top",
            width: 32,
            height: 32,
          }}
          src={weather.now.iconLink}
          alt={weather.now.iconName}
        />
        <div style={{ display: "inline", paddingTop: 0, fontSize: 24 }}>
          {weather.now.temperature}&deg; F
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: "bold" }}>
        Inside: {thermostat.ambient_temperature_f}&deg;F
      </div>
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
