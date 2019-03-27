import React from "react";

import Config from "Config";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const TiVoButtons = ({ style, device, commands }) => {
  if (!commands || !device || !commands.TiVo) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";
  return (
    <div>
      <Row style={style}>
        <ButtonGroup>
          <RemoteButton
            topic={command_topic + commands.Back.action.deviceId}
            message={commands.Back.name}
          >
            Back
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.Live.action.deviceId}
            message={commands.Live.name}
          >
            Live TV
          </RemoteButton>
          <RemoteButton
            variant="primary"
            topic={command_topic + commands.TiVo.action.deviceId}
            message="TiVo"
          >
            TiVo
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.Guide.action.deviceId}
            message={commands.Guide.name}
          >
            Guide
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.Info.action.deviceId}
            message={commands.Info.name}
          >
            Info
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style}>
        <ButtonGroup>
          <RemoteButton
            variant="success"
            topic={command_topic + commands.ThumbsUp.action.deviceId}
            message={commands.ThumbsUp.name}
          >
            <FaThumbsUp />
          </RemoteButton>
          <RemoteButton
            variant="danger"
            topic={command_topic + commands.ThumbsDown.action.deviceId}
            message={commands.ThumbsDown.name}
          >
            <FaThumbsDown />
          </RemoteButton>
        </ButtonGroup>
      </Row>
    </div>
  );
};

export default TiVoButtons;
