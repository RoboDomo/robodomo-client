import React, { useState, useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";

import RemoteButton from "common/RemoteButton";

import MQTT from "lib/MQTT";

import Config from "Config";
const Audio = ({ device }) => {
  const [mute, setMute] = useState(false);

  const topic = `${Config.mqtt.denon}/${device}/status/`,
    set_topic = topic.replace("status", "set");

  useEffect(() => {
    const onMessage = (topic, message) => {
      if (~topic.indexOf("MU")) {
        setMute(message !== "OFF");
      }
    };
    MQTT.subscribe(topic + "MU", onMessage);
    return () => {
      MQTT.unsubscribe(topic + "MU", onMessage);
    };
  });

  return (
    <>
      <ButtonGroup>
        <RemoteButton
          mini
          variant={mute ? "danger" : "default"}
          topic={set_topic + "MU"}
          message={mute ? "MUOFF" : "MUON"}
        >
          <FaVolumeMute />
        </RemoteButton>

        <RemoteButton mini topic={set_topic} message="MVDOWN">
          <FaVolumeDown />
        </RemoteButton>

        <RemoteButton mini topic={set_topic} message="MVUP">
          <FaVolumeUp />
        </RemoteButton>
      </ButtonGroup>
      <ButtonGroup>
        <RemoteButton topic={set_topic} message="MSAUTO">
          Auto
        </RemoteButton>
        <RemoteButton topic={set_topic} message="MSMOVIE">
          Movie
        </RemoteButton>
      </ButtonGroup>
    </>
  );
};
export default Audio;
