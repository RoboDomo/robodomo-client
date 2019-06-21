import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const TiVoButtons = ({ style, dispatch, hub }) => {
  const commands = hub.commands;
  if (!commands || !dispatch || !commands.TiVo) {
    return null;
  }

  // render JSX for button
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
          {makeButton(commands.Back)}
          {makeButton(commands.Live)}
          {makeButton(commands.TiVo, "primary")}
          {makeButton(commands.Guide)}
          {makeButton(commands.Info)}
        </ButtonGroup>
      </Row>
      <Row style={style}>
        <ButtonGroup>
          {makeButton(commands.ThumbsUp, "success", <FaThumbsUp />)}
          {makeButton(commands.ThumbsDown, "danger", <FaThumbsDown />)}
        </ButtonGroup>
      </Row>
    </div>
  );
};

//
export default TiVoButtons;
