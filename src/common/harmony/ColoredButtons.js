import React from "react";
import useConfig from "@/common/hooks/useConfig";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const ColoredButtons = ({ style, device, commands }) => {
  const Config = useConfig();
  if (!device || !commands || !commands.Yellow) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";

  return (
    <Row style={style}>
      <ButtonGroup>
        <RemoteButton
          variant="warning"
          topic={command_topic + commands.Yellow.action.deviceId}
          message={commands.Yellow.name}
        >
          Yellow
        </RemoteButton>
        <RemoteButton
          variant="info"
          topic={command_topic + commands.Blue.action.deviceId}
          message={commands.Blue.name}
        >
          Blue
        </RemoteButton>
        <RemoteButton
          variant="danger"
          topic={command_topic + commands.Red.action.deviceId}
          message={commands.Red.name}
        >
          Red
        </RemoteButton>
        <RemoteButton
          variant="success"
          topic={command_topic + commands.Green.action.deviceId}
          message={commands.Green.name}
        >
          Green
        </RemoteButton>
      </ButtonGroup>
    </Row>
  );
};

//
export default ColoredButtons;
