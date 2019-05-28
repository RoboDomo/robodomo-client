import React from "react";

import Config from "Config";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

// apple tv commands are similar to XBox (for example)
// but XBox has eject, and ATV does not.
const isAppleTV = commands => {
  return commands && commands.Back && commands.Home && commands.Menu && !commands.Eject;
};

const AppleTVButtons = ({ style, device, commands }) => {
  if (!device || !isAppleTV(commands)) {
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
          variant="primary"
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
export default AppleTVButtons;
