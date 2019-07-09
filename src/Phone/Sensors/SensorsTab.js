import React, { useEffect, useState } from "react";
import useConfig from "@/hooks/useConfig";

import MQTT from "@/lib/MQTT";
import { IonCard, IonHeader, IonCardHeader, IonCardContent, IonBadge } from "@ionic/react";

import { Badge, Card } from "react-bootstrap";

const SensorsTab = () => {
  const Config = useConfig();
  const [sensors, setSensors] = useState({});
  const types = ["contact", "motion", "battery", "temperature", "illuminance", "humidity"];

  if (!Config || !Array.isArray(Config.sensors)) {
    return null;
  }

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
  }, [Config.sensors]);

  const renderType = type => {
    let key = 0;

    return Config.sensors.map(sensor => {
      if (sensor.type !== type) {
        return null;
      }
      return (
        <div key={"type" + key++}>
          {sensor.name}
          <IonBadge variant="secondary" className="float-right">
            {sensors[sensor.topic]}
          </IonBadge>
        </div>
      );
    });
  };

  const renderCard = type => {
    return (
      <div style={{ padding: 10, marginTop: 10, fontSize: 18 }}>
        <IonCard color="dark">
          <IonCardHeader color="medium">{type.toUpperCase()}</IonCardHeader>
          <IonCardContent>{renderType(type)}</IonCardContent>
        </IonCard>
      </div>
    );
  };

  let col = 0;
  return (
    <div
      style={{
        overflow: "scroll",
        height: "100vh",
        paddingBottom: 300,
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
