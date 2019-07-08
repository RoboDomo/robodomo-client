import React, { useEffect, useRef, useState } from "react";
import useConfig from "@/hooks/useConfig";
import {
  useContact,
  useMotion,
  useBattery,
  useTemperature,
  useIlluminance,
  useHumidity,
} from "@/hooks/useSmartThings";
import useThermostat from "@/hooks/useThermostat";

import { Row, Col, Card } from "react-bootstrap";

const SensorsTab = () => {
  const Config = useConfig();

  const metric = Config ? Config.metric : false;

  const sensors = useRef({
    contact: {},
    motion: {},
    battery: {},
    temperature: {},
    illuminance: {},
    humidity: {},
  });

  const clearSensors = () => {
    sensors.current.contact = {};
    sensors.current.motion = {};
    sensors.current.battery = {};
    sensors.current.temperature = {};
    sensors.current.illuminance = {};
    sensors.current.humidity = {};
  };

  useEffect(() => {
    return () => {
      clearSensors();
      console.log("Sensors cleared");
    };
  }, []);

  if (!Config || !Array.isArray(Config.sensors)) {
    return null;
  }

  for (const sensor of Config.sensors) {
    switch (sensor.type) {
      case "contact":
        sensors.current.contact[sensor.name] = useContact(sensor.device || sensor.name, sensor.key);
        break;
      case "motion":
        sensors.current.motion[sensor.name] = useMotion(sensor.device || sensor.name, sensor.key);
        break;
      case "battery":
        sensors.current.battery[sensor.name] = useBattery(sensor.device || sensor.name, sensor.key);
        break;
      case "temperature":
        sensors.current.temperature[sensor.name] = useTemperature(
          sensor.device || sensor.name,
          sensor.key
        );
        break;
      case "illuminance":
        sensors.current.illuminance[sensor.name] = useIlluminance(
          sensor.device || sensor.name,
          sensor.key
        );
        break;
      case "humidity":
        if (sensor.source === "nest") {
          sensors.current.humidity[sensor.name] = useThermostat(
            sensor.device || sensor.name,
            sensor.key
          );
        } else {
          sensors.current.humidity[sensor.name] = useHumidity(
            sensor.device || sensor.name,
            sensor.key
          );
        }
        break;
      default:
        break;
    }
  }

  const renderType = type => {
    let key = 0;

    const m = [],
      h = sensors.current[type];

    for (const s of Object.keys(h)) {
      m.push(h[s]);
    }

    return m.map(sensor => {
      if (!sensor) {
        return null;
      }

      return (
        <div key={"type" + key++}>
          {sensor.name}
          <span style={{ float: "right" }}>
            {metric && sensor.metric ? sensor.metric : sensor.formatted}
          </span>
        </div>
      );
    });
  };

  const renderCard = type => {
    return (
      <Col sm={4} style={{ marginTop: 20 }}>
        <Card>
          <Card.Header>{type.toUpperCase()}</Card.Header>
          <Card.Body>{renderType(type)}</Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ padding: 20, marginTop: 10 }}>
      <Row>
        {renderCard("contact")}
        {renderCard("motion")}
        {renderCard("battery")}
      </Row>
      <Row>
        {renderCard("temperature")}
        {renderCard("illuminance")}
        {renderCard("humidity")}
      </Row>
    </div>
  );
};

//
export default SensorsTab;
