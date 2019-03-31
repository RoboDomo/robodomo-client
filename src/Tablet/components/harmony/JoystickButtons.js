import React from "react";

import Config from "Config";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const JoystickButtons = ({ style, device, commands }) => {
  if (!commands || !device || !commands.DirectionUp) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";
  const channelUp = commands.ChannelUp ? (
    <RemoteButton
      variant="info"
      topic={command_topic + commands.ChannelUp.action.deviceId}
      message={commands.ChannelUp.name}
    >
      +
    </RemoteButton>
  ) : (
    <RemoteButton variant="none" />
  );

  const channelDown = commands.ChannelDown ? (
    <RemoteButton
      variant="info"
      topic={command_topic + commands.ChannelDown.action.deviceId}
      message={commands.ChannelDown.name}
    >
      -
    </RemoteButton>
  ) : (
    <RemoteButton variant="none" />
  );
  return (
    <div>
      <Row style={style}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton
            topic={command_topic + commands.DirectionUp.action.deviceId}
            message={commands.DirectionUp.name}
          >
            <FaChevronUp />
          </RemoteButton>
          {channelUp}
        </ButtonGroup>
      </Row>
      <Row style={style}>
        <ButtonGroup>
          <RemoteButton
            topic={command_topic + commands.DirectionLeft.action.deviceId}
            message={commands.DirectionLeft.name}
          >
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton
            variant="primary"
            topic={command_topic + commands.Select.action.deviceId}
            message={commands.Select.name}
          >
            Select
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.DirectionRight.action.deviceId}
            message={commands.DirectionRight.name}
          >
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton
            topic={command_topic + commands.DirectionDown.action.deviceId}
            message={commands.DirectionDown.name}
          >
            <FaChevronDown />
          </RemoteButton>
          {channelDown}
        </ButtonGroup>
      </Row>
    </div>
  );
};
export default JoystickButtons;
