//import React, { useState, useEffect } from "react";
import React from "react";

import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import ActionButton from "common/ActionButton";

//import MQTT from "lib/MQTT";

//import Config from "Config";

const AudioControl = ({ avr }) => {
  //  console.log("AudioControl", avr);
  //  const [mute, setMute] = useState(false);
  //  const [volume, setVolume] = useState(0);
  //  const [center, setCenter] = useState(0);
  //  const [dolby, setDolby] = useState(null);

  //  const topic = `${Config.mqtt.denon}/${device.device}/status/`,
  //    set_topic = topic.replace("status", "set");

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

  if (!avr) {
    return null;
  }
  const dispatch = avr.dispatch;

  const button = (action, children, variant) => {
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
        {button("mute", <FaVolumeMute />, avr.mute ? "daner" : "primary")}
        {button("masterup", <FaVolumeUp />)}
        <div style={{ textAlign: "center", width: "100%" }}>
          {format(avr.masterVolume)}
        </div>
        {button("masterdown", <FaVolumeDown />)}
      </ButtonGroup>

      <ButtonGroup vertical>
        <div style={{ marginTop: 16 }}>Center Channel</div>
        {button("centerup", <FaVolumeUp />)}
        <div style={{ textAlign: "center", width: "100%" }}>
          {format(avr.centerVolume)}
        </div>
        {button("centerdown", <FaVolumeDown />)}
      </ButtonGroup>

      <ButtonGroup vertical>
        <div style={{ textAlign: "center", width: "100%", marginTop: 16 }}>
          {avr.surroundMode}
        </div>
        {button("auto", "Auto")}
        {button("movie", "Auto")}
        {button("music", "Music")}
      </ButtonGroup>
    </>
  );
};

export default AudioControl;
