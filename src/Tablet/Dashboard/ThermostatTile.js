import React, { useState, useReducer } from "react";

import useThermostat from "@/hooks/useThermostat";
import thermostatReducer from "@/hooks/reducers/thermostatReducer";

import Tile from "./Tile";
import NumberInput from "@/common/form/NumberInput";
import Thermostat from "react-nest-thermostat";
import { Form } from "react-bootstrap";

const ThermostatTile = ({ device }) => {
  const thermostat = useThermostat(device);
  const [, dispatch] = useReducer(thermostatReducer, { device: device });

  if (!thermostat || !thermostat.ambient_temperature_f || !thermostat.target_temperature_f) {
    return null;
  }

  return (
    <Tile width={2} height={2} onClick="nest">
      <div
        style={{
          textAlign: "center",
          marginTop: 0,
        }}
      >
        <div style={{ marginBottom: 8, fontSize: 18, fontWeight: "bold" }}>
          Inside: {thermostat.ambient_temperature_f}&deg;F
        </div>
        <Thermostat
          style={{ textAlign: "center " }}
          width="150px"
          height="150px"
          away={Boolean(thermostat.away !== "home")}
          ambientTemperature={Number(thermostat.ambient_temperature_f)}
          targetTemperature={Number(thermostat.target_temperature_f)}
          hvacMode={thermostat.hvac_state}
          leaf={thermostat.has_leaf}
        />
        <Form style={{ margin: 0 }}>
          <NumberInput
            key={thermostat.target_temperature_f}
            value={thermostat.target_temperature_f}
            onValueChange={temp => {
              console.log("onValueChange", temp);
              dispatch({ type: "target_temperature", value: temp });
            }}
          />
        </Form>
      </div>
    </Tile>
  );
};

//
export default ThermostatTile;
