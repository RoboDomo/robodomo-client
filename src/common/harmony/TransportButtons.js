/**
 * TransportButtons
 *
 * This is a button group/bar for rewind/pause/play/forward kind of buttons.
 */
import React from "react";
import useConfig from "@/common/hooks/useConfig";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";

import {
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaForward,
  FaFastForward,
  FaDotCircle,
} from "react-icons/fa";

const TransportButtons = ({ style, device, commands }) => {
  const Config = useConfig();
  if (!commands || !device || !commands.Pause) {
    return null;
  }
  const makeButton = (commands, device, kind, Icon) => {
    if (!commands[kind]) {
      return null;
    }
    const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";
    return (
      <RemoteButton
        mini
        variant={kind === "Record" ? "danger" : undefined}
        topic={command_topic + commands[kind].action.deviceId}
        message={commands[kind].name}
      >
        {Icon}
      </RemoteButton>
    );
  };

  return (
    <div style={style}>
      <Row>
        <ButtonGroup>
          {makeButton(commands, device, "SkipBackward", <FaFastBackward />)}
          {makeButton(commands, device, "Rewind", <FaBackward />)}
          {makeButton(commands, device, "Pause", <FaPause />)}
          {makeButton(commands, device, "Play", <FaPlay />)}
          {makeButton(commands, device, "FrameAdvance", <FaStepForward />)}
          {makeButton(commands, device, "FastForward", <FaForward />)}
          {makeButton(commands, device, "SkipForward", <FaFastForward />)}
          {makeButton(commands, device, "Record", <FaDotCircle />)}
        </ButtonGroup>
      </Row>
    </div>
  );
};
export default TransportButtons;
