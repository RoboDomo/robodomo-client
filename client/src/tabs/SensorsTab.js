import React, { useEffect, useRef, useReducer } from "react";

import Config from "Config";

import MQTT from "lib/MQTT";

import { Row, Col, Panel } from "react-bootstrap";

export default () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const currentState = useRef({});
  const types = [
    "contact",
    "motion",
    "battery",
    "temperature",
    "illuminance",
    "humidity"
  ];

  const onStateChange = (topic, newState) => {
    currentState.current[topic] = newState;
    forceUpdate();
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
          <span style={{ float: "right" }}>
            {currentState.current[sensor.topic]}
          </span>
        </div>
      );
    });
  };

  const renderCard = type => {
    return (
      <Col sm={4} style={{ marginTop: 20 }}>
        <Panel>
          <Panel.Heading>{type.toUpperCase()}</Panel.Heading>
          <Panel.Body>{renderType(type)}</Panel.Body>
        </Panel>
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
