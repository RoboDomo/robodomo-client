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
          bsStyle="warning"
          topic={command_topic + commands.Yellow.action.deviceId}
          message={commands.Yellow.name}
        >
          A
        </RemoteButton>
        <RemoteButton
          bsStyle="primary"
          topic={command_topic + commands.Blue.action.deviceId}
          message={commands.Blue.name}
        >
          B
        </RemoteButton>
        <RemoteButton
          bsStyle="danger"
          topic={command_topic + commands.Red.action.deviceId}
          message={commands.Red.name}
        >
          C
        </RemoteButton>
        <RemoteButton
          bsStyle="success"
          topic={command_topic + commands.Green.action.deviceId}
          message={commands.Green.name}
        >
          D
        </RemoteButton>
      </ButtonGroup>
    </Row>
  );
};
