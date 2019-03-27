//import React, { useState } from "react";
import React, { useState, useEffect } from "react";

import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import RemoteButton from "components/common/RemoteButton";

import MQTT from "lib/MQTT";

import Config from "Config";

const AudioControl = ({ device }) => {
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0);
  const [center, setCenter] = useState(0);
  const [dolby, setDolby] = useState(null);

  const topic = `${Config.mqtt.denon}/${device.device}/status/`,
    set_topic = topic.replace("status", "set");

  const format = n => {
    n = String(n / 10);
    if (n.indexOf(".") === -1) {
      n += ".0";
    }
    return n;
  };

  useEffect(() => {
    const onMessage = (topic, message) => {
      if (~topic.indexOf("MU")) {
        setMute(message !== "OFF");
      } else if (~topic.indexOf("MV")) {
        setVolume(Number(message));
      } else if (~topic.indexOf("MS")) {
        setDolby(message);
      } else if (~topic.indexOf("CVC")) {
        setCenter(Number(message.length === 2 ? message + "0" : message));
      }
    };

    MQTT.subscribe(topic + "MU", onMessage);
    MQTT.subscribe(topic + "MV", onMessage);
    MQTT.subscribe(topic + "MS", onMessage);
    MQTT.subscribe(topic + "CVC", onMessage);

    return () => {
      MQTT.unsubscribe(topic + "MU", onMessage);
      MQTT.unsubscribe(topic + "MV", onMessage);
      MQTT.unsubscribe(topic + "MS", onMessage);
      MQTT.unsubscribe(topic + "CVC", onMessage);
    };
  }, []);

  return (
    <>
      <ButtonGroup vertical>
        <div>Master Volume</div>
        <RemoteButton
          variant={mute ? "danger" : "primary"}
          topic={set_topic}
          message={mute ? "MUOFF" : "MUON"}
          name="mute"
        >
          <FaVolumeMute />
        </RemoteButton>
        <RemoteButton topic={set_topic} message="MVUP" name="volume-up">
          <FaVolumeUp />
        </RemoteButton>
        <div style={{ textAlign: "center", width: "100%" }}>
          {format(volume)}
        </div>
        <RemoteButton topic={set_topic} message="MVDOWN" name="volume-down">
          <FaVolumeDown />
        </RemoteButton>
      </ButtonGroup>

      <ButtonGroup vertical>
        <div style={{ marginTop: 16 }}>Center Channel</div>
        <RemoteButton topic={set_topic} message="CVC UP" name="center-up">
          <FaVolumeUp />
        </RemoteButton>
        <div style={{ textAlign: "center", width: "100%" }}>
          {format(center - 500)}
        </div>
        <RemoteButton topic={set_topic} message="CVC DOWN" name="center-down">
          <FaVolumeDown />
        </RemoteButton>
      </ButtonGroup>

      <ButtonGroup vertical>
        <div style={{ textAlign: "center", width: "100%", marginTop: 16 }}>
          {dolby}
        </div>
        <RemoteButton topic={set_topic} message="MSAUTO" name="auto">
          Auto
        </RemoteButton>
        <RemoteButton topic={set_topic} message="MSMOVIE" name="movie">
          Movie
        </RemoteButton>
        <RemoteButton topic={set_topic} message="MSMUSIC" name="music">
          Music
        </RemoteButton>
      </ButtonGroup>
    </>
  );
};
export default AudioControl;
