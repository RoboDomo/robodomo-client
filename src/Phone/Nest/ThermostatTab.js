import React, { useEffect, useState, useRef } from "react";
import useConfig from "@/common/hooks/useConfig";

import {
  ButtonGroup,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { FaChevronUp, FaChevronDown, FaChevronRight } from "react-icons/fa";

import Thermostat from "react-nest-thermostat";

import MQTT from "lib/MQTT";

const ThermostatTab = ({ thermostat }) => {
  const Config = useConfig();
  const device = thermostat.device;

  const thermostat_status_topic = Config.mqtt.nest + "/" + device + "/status/",
    thermostat_status_topic_length = thermostat_status_topic.length,
    set_topic = thermostat_status_topic.replace("status", "set");

  const weather_status_topic = useRef(null);

  const [thermoState, setThermoState] = useState({}),
    [weatherState, setWeatherState] = useState({});

  const thermostatTopics = [
    "device",
    "name",
    "structure_name",
    "postal_code",
    "away",
    "ambient_temperature_f",
    "target_temperature_f",
    "hvac_state",
    "has_leaf",
    "humidity",
    "time_to_target",
    "hvac_mode",
  ];
  const weatherTopics = ["now", "forecast"];

  const onWeatherChange = (topic, newState) => {
    const key = topic.substr(weather_status_topic.current.length);
    const s = {};
    s[key] = newState;
    setWeatherState(prev => ({ ...prev, ...s }));
  };

  const onThermostatChange = (topic, newState) => {
    const key = topic.substr(thermostat_status_topic_length);
    const s = {};
    s[key] = newState;
    setThermoState(prev => ({ ...prev, ...s }));
  };

  useEffect(() => {
    for (const topic of thermostatTopics) {
      MQTT.subscribe(thermostat_status_topic + topic, onThermostatChange);
    }
    return () => {
      for (const topic of thermostatTopics) {
        MQTT.unsubscribe(thermostat_status_topic + topic, onThermostatChange);
      }
      if (weather_status_topic.current) {
        const t = weather_status_topic.current;
        for (const w of weatherTopics) {
          MQTT.unsubscribe(t + w, onWeatherChange);
        }
      }
    };
  }, [onThermostatChange, thermostatTopics, thermostat_status_topic, weatherTopics]);

  const hvacModeChange = mode => {
    MQTT.publish(set_topic + "/hvac_mode", mode);
  };

  const adjustTemperature = temp => {
    const thermostat = thermoState;
    if (thermostat) {
      MQTT.publish(set_topic + "/target_temperature_f", thermostat.target_temperature_f + temp);
    }
  };

  const setTargetTemperature = temp => {
    MQTT.publish(set_topic + "/target_temperature_f", temp);
  };

  const render = () => {
    const thermostat = thermoState,
      weather = weatherState,
      now = weather ? weather.now : {};

    if (!thermostat || !now) {
      return null;
    }

    const target = n => {
      let icon = <FaChevronRight />,
        disabled = false;

      if (thermostat.target_temperature_f > n) {
        icon = <FaChevronDown />;
      } else if (thermostat.target_temperature_f < n) {
        icon = <FaChevronUp />;
      } else {
        icon = <FaChevronRight />;
        disabled = true;
      }
      return (
        <Button block disabled={disabled} onClick={() => setTargetTemperature(n)}>
          {icon} Set to {n}&deg;
        </Button>
      );
    };
    const renderTargets = () => {
      switch (thermoState.hvac_mode) {
        case "Off":
        default:
          return null;
        case "heat":
          return (
            <ButtonGroup vertical style={{ width: "100%" }}>
              {target(78)}
              {target(77)}
              {target(76)}
              {target(75)}
              {target(74)}
              {target(73)}
              {target(72)}
              {target(71)}
              {target(70)}
              {target(69)}
            </ButtonGroup>
          );
        case "cool":
          return (
            <ButtonGroup vertical style={{ width: "100%" }}>
              {target(82)}
              {target(81)}
              {target(80)}
              {target(79)}
              {target(79)}
              {target(77)}
              {target(76)}
              {target(75)}
              {target(74)}
              {target(73)}
            </ButtonGroup>
          );
      }
    };

    const bwidth = window.innerWidth / 5;
    return (
      <div
        style={{
          overflow: "scroll",
          height: "100vh",
          paddingBottom: 300,
          textAlign: "center",
        }}
      >
        <Thermostat
          style={{ textAlign: "center " }}
          width="300px"
          height="300px"
          away={Boolean(thermostat.away !== "home")}
          ambientTemperature={thermostat.ambient_temperature_f}
          targetTemperature={thermostat.target_temperature_f}
          hvacMode={thermostat.hvac_state}
          leaf={thermostat.has_leaf}
        />
        <ButtonGroup style={{ marginBottom: 8 }}>
          <Button onClick={() => adjustTemperature(-3)}>
            <FaChevronDown />
            &nbsp; 3 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(-2)}>
            <FaChevronDown />
            &nbsp; 2 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(-1)}>
            <FaChevronDown />
            &nbsp; 1 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(1)}>
            <FaChevronUp />
            &nbsp; 1 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(2)}>
            <FaChevronUp />
            &nbsp; 2 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(3)}>
            <FaChevronUp />
            &nbsp; 3 &deg;
          </Button>
        </ButtonGroup>
        <ToggleButtonGroup
          onChange={hvacModeChange}
          type="radio"
          size="lg"
          name="hvac"
          value={thermostat.hvac_mode}
        >
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="off">
            Off
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="heat">
            Heat
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="cool">
            Cool
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="heat-cool">
            Both
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="Eco">
            Eco
          </ToggleButton>
        </ToggleButtonGroup>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <ListGroup>
              <ListGroupItem>
                Presence
                <span style={{ float: "right" }}>{thermostat.away.toUpperCase()}</span>
              </ListGroupItem>
              <ListGroupItem>
                Inside Temp
                <span style={{ float: "right" }}>{thermostat.ambient_temperature_f}&deg;F</span>
              </ListGroupItem>
              <ListGroupItem>
                Humidity
                <span style={{ float: "right" }}>{thermostat.humidity}%</span>
              </ListGroupItem>
              <ListGroupItem>
                Mode
                <span style={{ float: "right" }}>{thermostat.hvac_mode}</span>
              </ListGroupItem>
              <ListGroupItem>
                Operating State
                <span style={{ float: "right" }}>{thermostat.hvac_state}</span>
              </ListGroupItem>
            </ListGroup>
            <ListGroup>
              <ListGroupItem>
                {thermostat.structure_name}
                <span style={{ float: "right" }}>{thermostat.postal_code}</span>
              </ListGroupItem>
              <ListGroupItem>
                Outside Temp
                <span style={{ float: "right" }}>{now.current_temperature}&deg;F</span>
              </ListGroupItem>
              <ListGroupItem>
                Outside Humidity
                <span style={{ float: "right" }}>{now.current_humidity}%</span>
              </ListGroupItem>
              <ListGroupItem>
                <span style={{ float: "right" }}>{now.conditions}</span>
              </ListGroupItem>
            </ListGroup>
          </div>
          <div style={{ flex: 1 }}>
            <ListGroup>
              <ListGroupItem>
                Target Temp
                <span style={{ float: "right" }}>{thermostat.target_temperature_f}&deg;F</span>
              </ListGroupItem>
              <ListGroupItem>
                Time To Target
                <span style={{ float: "right" }}>{thermostat.time_to_target}</span>
              </ListGroupItem>
            </ListGroup>
            {renderTargets()}
          </div>
        </div>
      </div>
    );
  };

  if (!weather_status_topic.current && thermoState.postal_code) {
    const t = (weather_status_topic.current = `${Config.mqtt.weather}/${
      thermoState.postal_code
    }/status/`);
    for (const w of weatherTopics) {
      MQTT.subscribe(t + w, onWeatherChange);
    }
  }
  return render();
};

export default ThermostatTab;
