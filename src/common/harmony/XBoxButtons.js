import React from "react";

import Config from "Config";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const XBoxButtons = ({ style, device, commands }) => {
  if (!device || !commands || !commands.GameX) {
    return null;
  }

  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";
  return (
    <div style={style}>
      <Row>
        <ButtonGroup>
          <RemoteButton
            topic={command_topic + commands.GameX.action.deviceId}
            message={commands.GameX.name}
          >
            X
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.GameY.action.deviceId}
            message={commands.GameY.name}
          >
            Y
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.XboxGuide.action.deviceId}
            message="Xbox"
          >
            XBox
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.GameA.action.deviceId}
            message={commands.GameA.name}
          >
            A
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.GameB.action.deviceId}
            message={commands.GameB.name}
          >
            B
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          <RemoteButton
            topic={command_topic + commands.Menu.action.deviceId}
            message={commands.Menu.name}
          >
            Menu
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.Info.action.deviceId}
            message={commands.Info.name}
          >
            Info
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.Live.action.deviceId}
            message="LiveTV"
          >
            Live TV
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.XboxGuide.action.deviceId}
            message="XboxGuide"
          >
            Guide
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.Eject.action.deviceId}
            message={commands.Eject.name}
          >
            Eject
          </RemoteButton>
        </ButtonGroup>
      </Row>
    </div>
  );
};
export default XBoxButtons;
