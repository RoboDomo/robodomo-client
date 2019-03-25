import React from "react";
import { ButtonGroup } from "react-bootstrap";

import RemoteButton from "components/common/RemoteButton";
import FanButton from "components/common/FanButton";
import DimmerButton from "components/common/DimmerButton";
import MQTTButton from "components/common/MQTTButton";
import ThermostatButton from "components/common/ThermostatButton";

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
              return <div key={key++}>{button.text}</div>;
            case "thermostat":
              return (
                <div key={key++} style={{ marginBottom: 8 }}>
                  <ThermostatButton
                    thermostat={button.device}
                    weather={button.weather}
                  />
                </div>
              );
            case "macro":
              return (
                <div key={key++}>
                  <MQTTButton name={button.name} device={button.device}>
                    <span>{button.name}</span>
                  </MQTTButton>
                </div>
              );
            case "fan":
              return (
                <div key={key++}>
                  <FanButton name={button.device} />
                </div>
              );
            case "dimmer":
              return (
                <div key={key++}>
                  <DimmerButton name={button.device} />
                </div>
              );
            default:
              return (
                <div key={key++}>
                  <RemoteButton>
                    <span>{button.name}</span>
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
