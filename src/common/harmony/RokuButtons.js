import React from "react";
import useConfig from "@/common/hooks/useConfig";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const RokuButtons = ({ style, device, commands }) => {
  const Config = useConfig();
  // Roku has "sleep" button, other players do not (that I know of)
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
            variant="primary"
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

//
export default RokuButtons;
