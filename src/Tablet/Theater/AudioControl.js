import React, { useReducer } from "react";

import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";

import ActionButton from "@/common/ActionButton";

import denonReducer from "@/hooks/reducers/denonReducer";

const format = n => {
  if (n === null) {
    return 0;
  }
  if (typeof n === "number") {
    if (n > 99) {
      return n / 10;
    }
    return n;
  }
  if (n.length === 3) {
    return Number(n) / 10;
  }
  return Number(n);
};

const AudioControl = ({ avr }) => {
  const [, dispatch] = useReducer(denonReducer, { device: avr ? avr.device : null });
  if (!avr) {
    return null;
  }

  const button = (action, children, variant) => {
    if (action === "mute") {
      action = avr.mute ? "unmute" : "mute";
    }

    return (
      <ActionButton variant={variant} dispatch={dispatch} action={action}>
        {children}
      </ActionButton>
    );
  };

  return (
    <>
      <ButtonGroup vertical>
        <div>Master Volume</div>
        {button("mute", <FaVolumeMute />, avr.mute ? "danger" : "primary")}
        {button("masterup", <FaVolumeUp />)}
        <div style={{ textAlign: "center", width: "100%" }}>{format(avr.masterVolume)}</div>
        {button("masterdown", <FaVolumeDown />)}
      </ButtonGroup>

      <ButtonGroup vertical>
        <div style={{ marginTop: 16 }}>Center Channel</div>
        {button("centerup", <FaVolumeUp />)}
        <div style={{ textAlign: "center", width: "100%" }}>{format(avr.centerVolume)}</div>
        {button("centerdown", <FaVolumeDown />)}
      </ButtonGroup>

      <ButtonGroup vertical>
        <div style={{ textAlign: "center", width: "100%", marginTop: 16 }}>{avr.surroundMode}</div>
        {button("auto", "Auto")}
        {button("movie", "Movie")}
        {button("music", "Music")}
      </ButtonGroup>
    </>
  );
};

//
export default AudioControl;
