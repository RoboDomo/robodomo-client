import React, { useState, useEffect } from "react";
import useConfig from "@/common/hooks/useConfig";
import NumberInput from "common/form/NumberInput";

import { ListGroup } from "react-bootstrap";

import MQTT from "lib/MQTT";

const topics = ["ambient_temperature_f", "target_temperature_f", "hvac_state"];

const ThermostatItem = ({ device }) => {
  const Config = useConfig();
  const [ambientTemperature, setAmbientTemperature] = useState("72");
  const [targetTemperature, setTargetTemperature] = useState("72");
  const [hvacState, setHVACState] = useState("off");

  const status_topic = Config.mqtt.nest + "/" + device + "/status/",
    set_topic = status_topic.replace("status", "set");

  useEffect(() => {
    const onStateChange = (topic, newValue) => {
      if (~topic.indexOf("ambient_temperature_f")) {
        setAmbientTemperature(newValue);
      } else if (~topic.indexOf("target_temperature_f")) {
        setTargetTemperature(newValue);
      } else if (~topic.indexOf("hvac_state")) {
        setHVACState(newValue);
      } else {
        console.log("invlaid topic/message", topic, newValue);
      }
    };

    for (const topic of topics) {
      MQTT.subscribe(status_topic + topic, onStateChange);
    }
    return () => {
      for (const topic of topics) {
        MQTT.unsubscribe(status_topic + topic, onStateChange);
      }
    };
  }, [status_topic]);

  let variant;
  if (hvacState === "cooling") {
    variant = "info";
  } else if (hvacState === "heating") {
    variant = "warning";
  }
  return (
    <ListGroup.Item variant={variant}>
      <div style={{ textAlign: "center" }}>{device}</div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 2,
            fontSize: 44,
            whiteSpace: "nowrap",
          }}
        >
          {ambientTemperature}&deg;F
        </div>
        <div style={{ flex: 2 }}>
          <NumberInput
            style={{ float: "left" }}
            key={targetTemperature}
            value={targetTemperature}
            onValueChange={temp => {
              MQTT.publish(set_topic + "/target_temperature_f", temp);
            }}
          />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default ThermostatItem;
