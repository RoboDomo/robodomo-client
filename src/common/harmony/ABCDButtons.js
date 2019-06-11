import React from "react";
import useConfig from "@/common/hooks/useConfig";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const ABCDButtons = ({ style, device, commands }) => {
  const Config = useConfig();
  if (!device || !commands || !commands.A) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";

  return (
    <Row style={style}>
      <ButtonGroup>
        <RemoteButton
          variant="warning"
          topic={command_topic + commands.A.action.deviceId}
          message={commands.A.name}
        >
          A
        </RemoteButton>
        <RemoteButton
          variant="primary"
          topic={command_topic + commands.B.action.deviceId}
          message={commands.B.name}
        >
          B
        </RemoteButton>
        <RemoteButton
          variant="danger"
          topic={command_topic + commands.C.action.deviceId}
          message={commands.C.name}
        >
          C
        </RemoteButton>
        <RemoteButton
          variant="success"
          topic={command_topic + commands.D.action.deviceId}
          message={commands.D.name}
        >
          D
        </RemoteButton>
      </ButtonGroup>
    </Row>
  );
};

//
export default ABCDButtons;
