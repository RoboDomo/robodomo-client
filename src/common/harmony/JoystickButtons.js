import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const JoystickButtons = ({ style, dispatch, hub }) => {
  const commands = hub.commands;
  if (!commands || !dispatch || !commands.DirectionUp) {
    return null;
  }

  const makeButton = (command, variant, text) => {
    return command ? (
      <RemoteButton
        variant={variant}
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
    <div>
      <Row style={style}>
        <ButtonGroup>
          {makeButton(null)}
          {makeButton(commands.DirectionUp, undefined, <FaChevronUp />)}
          {makeButton(commands.ChannelUp)}
        </ButtonGroup>
      </Row>
      <Row style={style}>
        <ButtonGroup>
          {makeButton(commands.DirectionLeft, undefined, <FaChevronLeft />)}
          {makeButton(commands.Select, "info")}
          {makeButton(commands.DirectionRight, undefined, <FaChevronRight />)}
        </ButtonGroup>
      </Row>
      <Row style={style}>
        <ButtonGroup>
          {makeButton(null)}
          {makeButton(commands.DirectionDown, undefined, <FaChevronDown />)}
          {makeButton(commands.ChannelDown)}
        </ButtonGroup>
      </Row>
    </div>
  );
};

//
export default JoystickButtons;
