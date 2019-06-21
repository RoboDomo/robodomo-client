import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const NumberButtons = ({ dispatch, style, hub }) => {
  const commands = hub.commands;
  if (!commands || !commands.Number1) {
    return null;
  }

  const makeButton = (command, text) => {
    return command ? (
      <RemoteButton
        onClick={() => {
          dispatch({ type: "send_key", command: command });
        }}
      >
        {text || command.name.replace("Number", "")}
      </RemoteButton>
    ) : (
      <RemoteButton variant="none" />
    );
  };

  return (
    <Row style={style}>
      <ButtonGroup>
        {makeButton(commands.Number1)}
        {makeButton(commands.Number2)}
        {makeButton(commands.Number3)}
      </ButtonGroup>
      <br />
      <ButtonGroup>
        {makeButton(commands.Number4)}
        {makeButton(commands.Number5)}
        {makeButton(commands.Number6)}
      </ButtonGroup>
      <br />
      <ButtonGroup>
        {makeButton(commands.Number7)}
        {makeButton(commands.Number8)}
        {makeButton(commands.Number9)}
      </ButtonGroup>
      <br />
      <ButtonGroup>
        {makeButton(commands.Clear)}
        {makeButton(commands.Number0)}
        {makeButton(commands.NumberEnter || commands.Dot)}
      </ButtonGroup>
    </Row>
  );
};

//
export default NumberButtons;
