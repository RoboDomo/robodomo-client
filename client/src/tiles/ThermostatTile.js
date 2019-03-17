import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";
import Tile from "Tile";
import NumberInput from "form/NumberInput";
import Thermostat from "react-nest-thermostat";
import { Form } from "react-bootstrap";

const topics = [
  "away",
  "ambient_temperature_f",
  "target_temperature_f",
  "hvac_state",
  "has_leaf"
];

const ThermostatTile = ({ device }) => {
  const [away, setAway] = useState("home");
  const [ambientTemperature, setAmbientTemperature] = useState("72");
  const [targetTemperature, setTargetTemperature] = useState("72");
  const [hvacState, setHVACState] = useState("off");
  const [hasLeaf, setHasLeaf] = useState(false);

  const status_topic = Config.mqtt.nest + "/" + device + "/status/",
    set_topic = status_topic.replace("status", "set");

  useEffect(() => {
    const onStateChange = (topic, newValue) => {
      if (~topic.indexOf("away")) {
        setAway(newValue);
      } else if (~topic.indexOf("ambient_temperature_f")) {
        setAmbientTemperature(newValue);
      } else if (~topic.indexOf("target_temperature_f")) {
        setTargetTemperature(newValue);
      } else if (~topic.indexOf("hvac_state")) {
        setHVACState(newValue);
      } else if (~topic.indexOf("has_leaf")) {
        setHasLeaf(newValue);
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
  }, []);

  return (
    <Tile width={2} height={2}>
      <div
        style={{
          textAlign: "center",
          marginTop: 0
        }}
      >
        <div style={{ marginBottom: 8, fontSize: 18, fontWeight: "bold" }}>
          Inside: {ambientTemperature}&deg;F
        </div>
        <Thermostat
          style={{ textAlign: "center " }}
          width="150px"
          height="150px"
          away={Boolean(away !== "home")}
          ambientTemperature={Number(ambientTemperature)}
          targetTemperature={Number(targetTemperature)}
          hvacMode={hvacState}
          leaf={hasLeaf}
        />
        <Form horizontal style={{ marginTop: 10 }}>
          <NumberInput
            key={targetTemperature}
            value={targetTemperature}
            onValueChange={temp => {
              MQTT.publish(set_topic + "/target_temperature_f", temp);
            }}
          />
        </Form>
      </div>
    </Tile>
  );
};
export default ThermostatTile;
