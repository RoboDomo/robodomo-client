import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

// apple tv commands are similar to XBox (for example)
// but XBox has eject, and ATV does not.
const isAppleTV = commands => {
  return commands && commands.Back && commands.Home && commands.Menu && !commands.Eject;
};

const AppleTVButtons = ({ style, dispatch, hub }) => {
  const commands = hub.commands;
  if (!dispatch || !isAppleTV(commands)) {
    return null;
  }

  // render JSX for button
  const makeButton = (command, variant, text) => {
    return command ? (
      <RemoteButton
        variant={variant}
        onClick={() => {
          dispatch({ type: "send_key", command: command });
        }}
      >
        {text || command.name}
      </RemoteButton>
    ) : (
      <RemoteButton variant="none" />
    );
  };

  // render
  return (
    <div>
      <ButtonGroup>
        {makeButton(commands.Back)}
        {makeButton(commands.Home, "primary")}
        {makeButton(commands.Menu)}
      </ButtonGroup>
    </div>
  );
};

//
export default AppleTVButtons;
