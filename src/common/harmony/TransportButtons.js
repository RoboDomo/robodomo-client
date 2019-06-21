/**
 * TransportButtons
 *
 * This is a button group/bar for rewind/pause/play/forward kind of buttons.
 */
import React from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

import {
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  FaStop,
  FaStepForward,
  FaForward,
  FaFastForward,
  FaDotCircle,
} from "react-icons/fa";

const TransportButtons = ({ dispatch, style, hub }) => {
  const commands = hub.commands;
  if (!commands || !commands.Pause) {
    return null;
  }

  // generate JSX markup for a button
  const makeButton = (command, text) => {
    if (!command) {
      return null;
    }
    return (
      <RemoteButton
        mini
        variant={command.name === "Record" ? "danger" : undefined}
        onClick={() => {
          dispatch({ type: "send_key", command: command });
        }}
      >
        {text || command.name}
      </RemoteButton>
    );
  };

  return (
    <div style={style}>
      <Row>
        <ButtonGroup>
          {makeButton(commands.SkipBackward, <FaFastBackward />)}
          {makeButton(commands.Rewind, <FaBackward />)}
          {makeButton(commands.Pause, <FaPause />)}
          {makeButton(commands.Stop, <FaStop />)}
          {makeButton(commands.Play, <FaPlay />)}
          {makeButton(commands.FrameAdvance, <FaStepForward />)}
          {makeButton(commands.FastForward, <FaForward />)}
          {makeButton(commands.SkipForward, <FaFastForward />)}
          {makeButton(commands.Record, <FaDotCircle />)}
        </ButtonGroup>
      </Row>
    </div>
  );
};

//
export default TransportButtons;
