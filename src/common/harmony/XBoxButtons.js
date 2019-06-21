import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const XBoxButtons = ({ style, dispatch, hub }) => {
  const commands = hub.commands;
  if (!dispatch || !commands || !commands.GameX) {
    return null;
  }

  const makeButton = (command, text) => {
    return command ? (
      <RemoteButton
        onClick={() => {
          dispatch({ type: "send_key", value: command });
        }}
      >
        {text || command.name}
      </RemoteButton>
    ) : (
      <RemoteButton variant="none" />
    );
  };

  return (
    <div style={style}>
      <Row>
        <ButtonGroup>
          {makeButton(commands.GameX)}
          {makeButton(commands.GameY)}
          {makeButton(commands.XboxGuide)}
          {makeButton(commands.GameA)}
          {makeButton(commands.GameB)}
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          {makeButton(commands.Menu)}
          {makeButton(commands.Info)}
          {makeButton(commands.Live)}
          {makeButton(commands.XboxGuide, "Guide")}
          {makeButton(commands.Eject)}
        </ButtonGroup>
      </Row>
    </div>
  );
};

//
export default XBoxButtons;
