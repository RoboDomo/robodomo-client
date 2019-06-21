import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const ColoredButtons = ({ style, dispatch, hub }) => {
  const commands = hub.commands;
  if (!dispatch || !commands || !commands.Yellow) {
    return null;
  }

  // generate JSX markup for a button
  const makeButton = (command, variant, text) => {
    return (
      <RemoteButton
        mini
        variant={variant}
        onClick={() => {
          dispatch({ type: "send_key", command: command });
        }}
      >
        {text || command.name}
      </RemoteButton>
    );
  };

  return (
    <Row style={style}>
      <ButtonGroup>
        {makeButton(commands.Yellow, "warning")}
        {makeButton(commands.Blue, "info")}
        {makeButton(commands.Red, "danger")}
        {makeButton(commands.Green, "success")}
      </ButtonGroup>
    </Row>
  );
};

//
export default ColoredButtons;
