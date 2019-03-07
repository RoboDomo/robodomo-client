import React from "react";

import Config from "Config";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

const isAppleTV = commands => {
  return commands.Back && commands.Home && commands.Menu && !commands.Eject;
};

export default ({ style, device, commands }) => {
  if (!commands || !device || !isAppleTV(commands)) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";

  const clearButton = commands.Clear ? (
    <RemoteButton
      topic={command_topic + commands.Clear.action.deviceId}
      message={commands.Clear.name}
    >
      Clear
    </RemoteButton>
  ) : null;
  const ejectButton = commands.Eject ? (
    <RemoteButton
      topic={command_topic + commands.Eject.action.deviceId}
      message={commands.Eject.name}
    >
      Eject
    </RemoteButton>
  ) : null;
  return (
    <Row style={{ ...style }}>
      <ButtonGroup>
        {clearButton}
        <RemoteButton
          topic={command_topic + commands.Back.action.deviceId}
          message={commands.Back.name}
        >
          Back
        </RemoteButton>
        <RemoteButton
          bsStyle="primary"
          topic={command_topic + commands.Home.action.deviceId}
          message={commands.Home.name}
        >
          Home
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Menu.action.deviceId}
          message={commands.Menu.name}
        >
          Menu
        </RemoteButton>
        {ejectButton}
      </ButtonGroup>
    </Row>
  );
};
