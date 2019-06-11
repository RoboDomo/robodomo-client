import React, { useState, useEffect } from "react";
import useConfig from "@/common/hooks/useConfig";

import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import RemoteButton from "common/RemoteButton";

import MQTT from "lib/MQTT";

const AudioControl = ({ device }) => {
  const Config = useConfig();
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
  }, [topic]);

  return (
    <div style={{ textAlign: "center" }}>
      {dolby}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.5 }}>
          Master Volume {format(volume)}
          <ButtonGroup>
            <RemoteButton
              mini
              variant={mute ? "danger" : "primary"}
              topic={set_topic}
              message={mute ? "MUOFF" : "MUON"}
              name="mute"
            >
              <FaVolumeMute />
            </RemoteButton>
            <RemoteButton mini topic={set_topic} message="MVUP" name="volume-up">
              <FaVolumeUp />
            </RemoteButton>
            <RemoteButton mini topic={set_topic} message="MVDOWN" name="volume-down">
              <FaVolumeDown />
            </RemoteButton>
          </ButtonGroup>
        </div>

        <div style={{ flex: 1 }}>
          Center {format(center - 500)}
          <ButtonGroup>
            <RemoteButton mini topic={set_topic} message="CVC UP" name="center-up">
              <FaVolumeUp />
            </RemoteButton>
            <RemoteButton mini topic={set_topic} message="CVC DOWN" name="center-down">
              <FaVolumeDown />
            </RemoteButton>
          </ButtonGroup>
        </div>

        <div style={{ flex: 1 }}>
          Mode
          <br />
          <ButtonGroup vertical>
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
        </div>
      </div>
    </div>
  );
};

export default AudioControl;
