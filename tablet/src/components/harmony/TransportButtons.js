/**
 * TransportButtons
 *
 * This is a button group/bar for rewind/pause/play/forward kind of buttons.
 */
import React from "react";

import Config from "Config";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

const TransportButtons = ({ style, device, commands }) => {
  if (!commands || !device || !commands.Pause) {
    return null;
  }
  const makeButton = (commands, device, kind, glyph) => {
    if (!commands[kind]) {
      return null;
    }
    const command_topic = Config.mqtt.harmony + "/" + device + "/set/device/";
    return (
      <RemoteButton
        mini
        bsStyle={kind === "Record" ? "danger" : undefined}
        topic={command_topic + commands[kind].action.deviceId}
        message={commands[kind].name}
      >
        <Glyphicon glyph={glyph} />
      </RemoteButton>
    );
  };

  return (
    <div style={style}>
      <Row>
        <ButtonGroup>
          {makeButton(commands, device, "SkipBackward", "fast-backward")}
          {makeButton(commands, device, "Rewind", "backward")}
          {makeButton(commands, device, "Pause", "pause")}
          {makeButton(commands, device, "Play", "play")}
          {makeButton(commands, device, "FrameAdvance", "step-forward")}
          {makeButton(commands, device, "FastForward", "forward")}
          {makeButton(commands, device, "SkipForward", "fast-forward")}
          {makeButton(commands, device, "Record", "record")}
        </ButtonGroup>
      </Row>
    </div>
  );
};
export default TransportButtons;
