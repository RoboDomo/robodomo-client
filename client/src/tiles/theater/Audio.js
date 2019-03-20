import React, { useState, useEffect } from "react";
import { ButtonGroup, Glyphicon } from "react-bootstrap";

import RemoteButton from "components/common/RemoteButton";

import MQTT from "lib/MQTT";

import Config from "Config";
const Audio = ({ device }) => {
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0);

  const topic = `${Config.mqtt.denon}/${device}/status/`,
    set_topic = topic.replace("status", "set");

  useEffect(() => {
    const onMessage = (topic, message) => {
      if (~topic.indexOf("MU")) {
        setMute(message !== "OFF");
      } else if (~topic.indexOf("MV")) {
        setVolume(Number(message));
      }
    };
    MQTT.subscribe(topic + "MU", onMessage);
    MQTT.subscribe(topic + "MV", onMessage);
    return () => {
      MQTT.unsubscribe(topic + "MU", onMessage);
      MQTT.unsubscribe(topic + "MV", onMessage);
    };
  });

  return (
    <>
      <ButtonGroup>
        <RemoteButton
          mini
          bsStyle={mute ? "danger" : "default"}
          topic={set_topic + "MU"}
          message={mute ? "MUOFF" : "MUON"}
        >
          <Glyphicon glyph="volume-off" />
        </RemoteButton>

        <RemoteButton mini topic={set_topic} message="MVDOWN">
          <Glyphicon glyph="volume-down" />
        </RemoteButton>

        <RemoteButton mini topic={set_topic} message="MVUP">
          <Glyphicon glyph="volume-up" />
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
