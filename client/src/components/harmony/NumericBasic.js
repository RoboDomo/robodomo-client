import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

export default ({ device, commands }) => {
  if (!device || !commands) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";

  return (
    <Row>
      <ButtonGroup>
        <RemoteButton
          topic={command_topic + commands.Number1.action.deviceId}
          message={commands.Number1.name}
        >
          1
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number2.action.deviceId}
          message={commands.Number2.name}
        >
          2
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number3.action.deviceId}
          message={commands.Number3.name}
        >
          3
        </RemoteButton>
      </ButtonGroup>
      <br />
      <ButtonGroup>
        <RemoteButton
          topic={command_topic + commands.Number4.action.deviceId}
          message={commands.Number4.name}
        >
          4
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number5.action.deviceId}
          message={commands.Number5.name}
        >
          5
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number6.action.deviceId}
          message={commands.Number6.name}
        >
          6
        </RemoteButton>
      </ButtonGroup>
      <br />
      <ButtonGroup>
        <RemoteButton
          topic={command_topic + commands.Number7.action.deviceId}
          message={commands.Number7.name}
        >
          7
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number8.action.deviceId}
          message={commands.Number8.name}
        >
          8
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number9.action.deviceId}
          message={commands.Number9.name}
        >
          9
        </RemoteButton>
      </ButtonGroup>
      <br />
      <ButtonGroup>
        <RemoteButton bsStyle="none" />
        <RemoteButton
          topic={command_topic + commands.Number0.action.deviceId}
          message={commands.Number0.name}
        >
          0
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.NumberEnter.action.deviceId}
          message={commands.NumberEnter.name}
        >
          Enter
        </RemoteButton>
      </ButtonGroup>
    </Row>
  );
};
