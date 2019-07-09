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

import { Row, Col, Card } from "react-bootstrap";
import { IonCard, IonHeader, IonCardHeader, IonCardContent, IonCol, IonRow } from '@ionic/react';

const SensorsTab = () => {
  const Config = useConfig();

  if (!Config || !Array.isArray(Config.sensors)) {
    return null;
  }
  const metric = Config.metric;

  const sensors = useRef({
    contact: {},
    motion: {},
    battery: {},
    temperature: {},
    illuminance: {},
    humidity: {},
  });
  const types = ["contact", "motion", "battery", "temperature", "illuminance", "humidity"];

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
    };
  }, []);

  for (const sensor of Config.sensors) {
    switch (sensor.type) {
      case "contact":
        sensors.current.contact[sensor.name] = useContact(sensor.name);
        break;
      case "motion":
        sensors.current.motion[sensor.name] = useMotion(sensor.name);
        break;
      case "battery":
        sensors.current.battery[sensor.name] = useBattery(sensor.name);
        break;
      case "temperature":
        sensors.current.temperature[sensor.name] = useTemperature(sensor.name);
        break;
      case "illuminance":
        sensors.current.illuminance[sensor.name] = useIlluminance(sensor.name);
        break;
      case "humidity":
        sensors.current.humidity[sensor.name] = useHumidity(sensor.name);
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
      <IonCol sm={4} style={{ marginTop: 20 }}>
        <IonCard>
          <IonCardHeader>{type.toUpperCase()}</IonCardHeader>
          <IonCardContent>{renderType(type)}</IonCardContent>
        </IonCard>
      </IonCol>
    );
  };

  let col = 0;
  return (
    <div style={{ padding: 20, marginTop: 10 }}>
      <IonRow>
        {renderCard(types[col++])}
        {renderCard(types[col++])}
        {renderCard(types[col++])}
      </IonRow>
      <IonRow>
        {renderCard(types[col++])}
        {renderCard(types[col++])}
        {renderCard(types[col++])}
      </IonRow>
    </div>
  );
};

//
export default SensorsTab;
