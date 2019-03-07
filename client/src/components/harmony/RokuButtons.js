import React from "react";

import Config from "Config";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

export default ({ style, device, commands }) => {
  if (!device || !commands || (!commands.Sleep && !commands.Options)) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";
  return (
    <div style={style}>
      <Row>
        <ButtonGroup>
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
            topic={command_topic + commands.Options.action.deviceId}
            message={commands.Options.name}
          >
            Options
          </RemoteButton>
        </ButtonGroup>
      </Row>
    </div>
  );
};
