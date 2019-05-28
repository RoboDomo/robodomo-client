import React from "react";
import { ButtonGroup } from "react-bootstrap";

import RemoteButton from "common/RemoteButton";
import FanButton from "common/FanButton";
import DimmerButton from "common/DimmerButton";
import MQTTButton from "common/MQTTButton";
import ThermostatButton from "common/ThermostatButton";

const ButtonList = ({ theater }) => {
  if (!theater.buttons) {
    return null;
  }

  let key = 0;
  return (
    <div style={{ textAlign: "center" }}>
      <ButtonGroup vertical>
        {theater.buttons.map(button => {
          switch (button.type) {
            case "label":
              return (
                <div key={key++} style={{ textAlign: "center", width: "100%" }}>
                  {button.text}
                </div>
              );
            case "thermostat":
              return (
                <div key={key++} style={{ textAlign: "center", width: "100%" }}>
                  <ThermostatButton thermostat={button.device} weather={button.weather} />
                </div>
              );
            case "macro":
              return (
                <div key={key++} style={{ textAlign: "center", width: "100%" }}>
                  <MQTTButton name={button.name} device={button.device}>
                    <span style={{ whiteSpace: "nowrap" }}>{button.name}</span>
                  </MQTTButton>
                </div>
              );
            case "fan":
              return (
                <div key={key++} style={{ textAlign: "center", width: "100%" }}>
                  <FanButton name={button.device} />
                </div>
              );
            case "dimmer":
              return (
                <div key={key++} style={{ textAlign: "center", width: "100%" }}>
                  <DimmerButton name={button.device} />
                </div>
              );
            default:
              return (
                <div key={key++} style={{ textAlign: "center", width: "100%" }}>
                  <RemoteButton>
                    <span style={{ whiteSpace: "nowrap" }}>{button.name}</span>
                  </RemoteButton>
                </div>
              );
          }
        })}
      </ButtonGroup>
    </div>
  );
};
export default ButtonList;
