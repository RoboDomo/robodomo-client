import React from "react";

import Config from "Config";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const NumberButtons = ({ style, device, commands }) => {
  if (!device || !commands || !commands.Number1) {
    return null;
  }
  const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";

  const enterItem = commands.NumberEnter || commands.Dot;
  const enterButton = enterItem ? (
    <RemoteButton topic={command_topic + enterItem.action.deviceId} message={enterItem.name}>
      {commands.NumberEnter ? "Enter" : "."}
    </RemoteButton>
  ) : (
    <RemoteButton variant="none" />
  );
  const clearButton = commands.Clear ? (
    <RemoteButton
      topic={command_topic + commands.Clear.action.deviceId}
      message={commands.Clear.name}
    >
      Clear
    </RemoteButton>
  ) : (
    <RemoteButton variant="none" />
  );
  return (
    <Row style={style}>
      <ButtonGroup>
        <RemoteButton
          topic={command_topic + commands.Number1.action.deviceId}
          message={commands.Number1.name}
        >
          1
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number2.action.deviceId}
          message={commands.Number2.name}
        >
          2
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number3.action.deviceId}
          message={commands.Number3.name}
        >
          3
        </RemoteButton>
      </ButtonGroup>
      <br />
      <ButtonGroup>
        <RemoteButton
          topic={command_topic + commands.Number4.action.deviceId}
          message={commands.Number4.name}
        >
          4
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number5.action.deviceId}
          message={commands.Number5.name}
        >
          5
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number6.action.deviceId}
          message={commands.Number6.name}
        >
          6
        </RemoteButton>
      </ButtonGroup>
      <br />
      <ButtonGroup>
        <RemoteButton
          topic={command_topic + commands.Number7.action.deviceId}
          message={commands.Number7.name}
        >
          7
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number8.action.deviceId}
          message={commands.Number8.name}
        >
          8
        </RemoteButton>
        <RemoteButton
          topic={command_topic + commands.Number9.action.deviceId}
          message={commands.Number9.name}
        >
          9
        </RemoteButton>
      </ButtonGroup>
      <br />
      <ButtonGroup>
        {clearButton}
        <RemoteButton
          topic={command_topic + commands.Number0.action.deviceId}
          message={commands.Number0.name}
        >
          0
        </RemoteButton>
        {enterButton}
      </ButtonGroup>
    </Row>
  );
};

export default NumberButtons;
