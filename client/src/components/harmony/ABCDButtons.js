import React from "react";

import Config from "Config";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const ABCDButtons = ({ style, device, commands }) => {
  if (!device || !commands || !commands.A) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";

  return (
    <Row style={style}>
      <ButtonGroup>
        <RemoteButton
          bsStyle="warning"
          topic={command_topic + commands.A.action.deviceId}
          message={commands.A.name}
        >
          A
        </RemoteButton>
        <RemoteButton
          bsStyle="primary"
          topic={command_topic + commands.B.action.deviceId}
          message={commands.B.name}
        >
          B
        </RemoteButton>
        <RemoteButton
          bsStyle="danger"
          topic={command_topic + commands.C.action.deviceId}
          message={commands.C.name}
        >
          C
        </RemoteButton>
        <RemoteButton
          bsStyle="success"
          topic={command_topic + commands.D.action.deviceId}
          message={commands.D.name}
        >
          D
        </RemoteButton>
      </ButtonGroup>
    </Row>
  );
};
export default ABCDButtons;
