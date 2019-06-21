import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

const RokuButtons = ({ style, dispatch, hub }) => {
  // Roku has "sleep" button, other players do not (that I know of)
  const commands = hub.commands;
  if (!dispatch || !commands || (!commands.Sleep && !commands.Options)) {
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
    <div style={style}>
      <Row>
        <ButtonGroup>
          {makeButton(commands.Back)}
          {makeButton(commands.Home, "primary")}
          {makeButton(commands.Options)}
        </ButtonGroup>
      </Row>
    </div>
  );
};

//
export default RokuButtons;
