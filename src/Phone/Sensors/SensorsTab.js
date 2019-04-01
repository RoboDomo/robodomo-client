import React, { useEffect, useState } from "react";

import Config from "Config";

import MQTT from "lib/MQTT";

import { Badge, Card } from "react-bootstrap";

const SensorsTab = () => {
  const [sensors, setSensors] = useState({});
  const types = [
    "contact",
    "motion",
    "battery",
    "temperature",
    "illuminance",
    "humidity"
  ];

  const onStateChange = (topic, newState) => {
    const s = {};
    s[topic] = newState;
    setSensors(prev => ({ ...prev, ...s }));
  };

  useEffect(() => {
    for (const sensor of Config.sensors) {
      MQTT.subscribe(sensor.topic, onStateChange);
    }
    return () => {
      for (const sensor of Config.sensors) {
        MQTT.unsubscribe(sensor.topic, onStateChange);
      }
    };
  }, []);

  const renderType = type => {
    let key = 0;

    return Config.sensors.map(sensor => {
      if (sensor.type !== type) {
        return null;
      }
      return (
        <div key={"type" + key++}>
          {sensor.name}
          <Badge variant="secondary" className="float-right">
            {sensors[sensor.topic]}
          </Badge>
        </div>
      );
    });
  };

  const renderCard = type => {
    return (
      <div style={{ padding: 10, marginTop: 10, fontSize: 18 }}>
        <Card>
          <Card.Header>{type.toUpperCase()}</Card.Header>
          <Card.Body>{renderType(type)}</Card.Body>
        </Card>
      </div>
    );
  };

  let col = 0;
  return (
    <div
      style={{
        overflow: "scroll",
        height: "100vh",
        paddingBottom: 300
      }}
    >
      {renderCard(types[col++])}
      {renderCard(types[col++])}
      {renderCard(types[col++])}
      {renderCard(types[col++])}
      {renderCard(types[col++])}
      {renderCard(types[col++])}
    </div>
  );
};

export default SensorsTab;
