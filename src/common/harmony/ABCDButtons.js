import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const ABCDButtons = ({ style, dispatch, hub }) => {
  const commands = hub.commands;
  if (!dispatch || !commands || !commands.A) {
    return null;
  }

  // generate JSX markup for a button
  const makeButton = (command, variant, text) => {
    return (
      <RemoteButton
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
        {makeButton(commands.A, "warning")}
        {makeButton(commands.B, "primary")}
        {makeButton(commands.C, "danger")}
        {makeButton(commands.D, "success")}
      </ButtonGroup>
    </Row>
  );
};

//
export default ABCDButtons;
