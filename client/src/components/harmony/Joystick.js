import React, { useState, useEffect } from "react";

import Config from "Config";
import MQTT from "lib/MQTT";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

export default ({ device, commands }) => {
  if (!commands || !device) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";
  const channelUp = commands.ChannelUp ? (
    <RemoteButton
      bsStyle="info"
      topic={command_topic + commands.ChannelUp.action.deviceId}
      message={commands.ChannelUp.name}
    >
      +
    </RemoteButton>
  ) : (
    <RemoteButton bsStyle="none" />
  );
  const channelDown = commands.ChannelDown ? (
    <RemoteButton
      bsStyle="info"
      topic={command_topic + commands.ChannelDown.action.deviceId}
      message={commands.ChannelDown.name}
    >
      -
    </RemoteButton>
  ) : (
    <RemoteButton bsStyle="none" />
  );
  return (
    <>
      <Row>
        <ButtonGroup>
          <RemoteButton bsStyle="none" />
          <RemoteButton
            topic={command_topic + commands.DirectionUp.action.deviceId}
            message={commands.DirectionUp.name}
          >
            <Glyphicon glyph="chevron-up" />
          </RemoteButton>
          {channelUp}
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          <RemoteButton
            topic={command_topic + commands.DirectionLeft.action.deviceId}
            message={commands.DirectionLeft.name}
          >
            <Glyphicon glyph="chevron-left" />
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.Select.action.deviceId}
            message={commands.Select.name}
          >
            Select
          </RemoteButton>
          <RemoteButton
            topic={command_topic + commands.DirectionRight.action.deviceId}
            message={commands.DirectionRight.name}
          >
            <Glyphicon glyph="chevron-right" />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          <RemoteButton bsStyle="none" />
          <RemoteButton
            topic={command_topic + commands.DirectionDown.action.deviceId}
            message={commands.DirectionDown.name}
          >
            <Glyphicon glyph="chevron-down" />
          </RemoteButton>
          {channelDown}
        </ButtonGroup>
      </Row>
    </>
  );
};
