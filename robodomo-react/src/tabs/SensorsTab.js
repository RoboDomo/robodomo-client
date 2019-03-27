import React, { useEffect, useState } from "react";

import Config from "Config";

import MQTT from "lib/MQTT";

import { Row, Col, Card } from "react-bootstrap";

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
          <span style={{ float: "right" }}>{sensors[sensor.topic]}</span>
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

  let col = 0;
  return (
    <div style={{ padding: 20, marginTop: 10 }}>
      <Row>
        {renderCard(types[col++])}
        {renderCard(types[col++])}
        {renderCard(types[col++])}
      </Row>
      <Row>
        {renderCard(types[col++])}
        {renderCard(types[col++])}
        {renderCard(types[col++])}
      </Row>
    </div>
  );
};
export default SensorsTab;
