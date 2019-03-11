import React, { useEffect, useRef, useReducer } from "react";

import Config from "Config";

import {
  ToggleButton,
  ToggleButtonGroup,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

import Thermostat from "react-nest-thermostat";

import MQTT from "lib/MQTT";

import { FaAngleRight, FaAngleUp, FaAngleDown } from "react-icons/fa";

export default ({ thermostat }) => {
  const device = thermostat.device;
  //  const [renderCount, setRenderCount] = useState(true);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const thermostat_status_topic = Config.mqtt.nest + "/" + device + "/status/",
    thermostat_status_topic_length = thermostat_status_topic.length,
    set_topic = thermostat_status_topic.replace("status", "set");

  const weather_status_topic = useRef(null);

  const thermoState = useRef({}),
    weatherState = useRef({});

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
    "hvac_mode"
  ];
  const weatherTopics = ["now", "forecast"];

  const onWeatherChange = (topic, newState) => {
    const key = topic.substr(weather_status_topic.current.length);
    weatherState.current[key] = newState;
    console.log("weather change", weatherState.current);
    forceUpdate();
  };

  const onThermostatChange = (topic, newState) => {
    const key = topic.substr(thermostat_status_topic_length);
    thermoState.current[key] = newState;
    forceUpdate();
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
  }, []);

  const hvacModeChange = mode => {
    MQTT.publish(set_topic + "/hvac_mode", mode);
  };

  const adjustTemperature = temp => {
    const thermostat = thermoState.current;
    if (thermostat) {
      MQTT.publish(
        set_topic + "/target_temperature_f",
        thermostat.target_temperature_f + temp
      );
    }
  };

  const setTargetTemperature = temp => {
    MQTT.publish(set_topic + "/target_temperature_f", temp);
  };

  const render = () => {
    const thermostat = thermoState.current,
      weather = weatherState.current,
      now = weather ? weather.now : {};

    //    console.log("RENDER", thermostat, weatherState);
    if (!thermostat || !now) {
      return null;
    }
    return (
      <Row style={{ marginTop: 6 }}>
        <Col sm={3}>
          <ListGroup>
            <ListGroupItem>
              Presence
              <span style={{ float: "right" }}>{thermostat.away}</span>
            </ListGroupItem>
            <ListGroupItem>
              Ambient Temperature
              <span style={{ float: "right" }}>
                {thermostat.ambient_temperature_f}&deg;F
              </span>
            </ListGroupItem>
            <ListGroupItem>
              Ambient Humidity
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
              Outside Temperature
              <span style={{ float: "right" }}>
                {now.current_temperature}&deg;F
              </span>
            </ListGroupItem>
            <ListGroupItem>
              Outside Humidity
              <span style={{ float: "right" }}>{now.current_humidity}%</span>
            </ListGroupItem>
            <ListGroupItem>
              Conditions
              <span style={{ float: "right" }}>{now.conditions}</span>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col sm={6}>
          <div style={{ textAlign: "center", fontSize: 48 }}>
            <Thermostat
              style={{ textAlign: "center " }}
              width="400px"
              height="400px"
              away={Boolean(thermostat.away !== "home")}
              ambientTemperature={thermostat.ambient_temperature_f}
              targetTemperature={thermostat.target_temperature_f}
              hvacMode={thermostat.hvac_state}
              leaf={thermostat.has_leaf}
            />
            <br />
            <ToggleButtonGroup
              onChange={hvacModeChange}
              type="radio"
              size="lg"
              name="hvac"
              value={thermostat.hvac_mode}
            >
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="off">
                Off
              </ToggleButton>
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="heat">
                Heat
              </ToggleButton>
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="cool">
                Cool
              </ToggleButton>
              <ToggleButton
                style={{ width: 85, fontSize: 14 }}
                value="heat-cool"
              >
                Heat-Cool
              </ToggleButton>
              <ToggleButton style={{ width: 85, fontSize: 14 }} value="Eco">
                Eco
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Col>
        <Col sm={3}>
          <ListGroup>
            <ListGroupItem>
              Target Temperature
              <span style={{ float: "right" }}>
                {thermostat.target_temperature_f}&deg;F
              </span>
            </ListGroupItem>
            <ListGroupItem>
              Time To Target
              <span style={{ float: "right" }}>
                {thermostat.time_to_target}
              </span>
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem onClick={() => adjustTemperature(-2)}>
              <FaAngleDown /> Adjust{" "}
              <span style={{ float: "right" }}>-2 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => adjustTemperature(-1)}>
              <FaAngleDown /> Adjust{" "}
              <span style={{ float: "right" }}>-1 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => adjustTemperature(1)}>
              <FaAngleUp /> Adjust{" "}
              <span style={{ float: "right" }}>+1 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => adjustTemperature(2)}>
              <FaAngleUp /> Adjust{" "}
              <span style={{ float: "right" }}>+2 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => setTargetTemperature(82)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>82 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => setTargetTemperature(79)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>78 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => setTargetTemperature(75)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>75 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => setTargetTemperature(72)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>72 &deg;</span>
            </ListGroupItem>
            <ListGroupItem onClick={() => setTargetTemperature(70)}>
              <FaAngleRight />
              Set <span style={{ float: "right" }}>70 &deg;</span>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    );
  };

  if (!weather_status_topic.current && thermoState.current.postal_code) {
    console.log("SUBSCRIBING!!!");
    const t = (weather_status_topic.current = `${Config.mqtt.weather}/${
      thermoState.current.postal_code
    }/status/`);
    for (const w of weatherTopics) {
      MQTT.subscribe(t + w, onWeatherChange);
    }
  }
  return render();
};
