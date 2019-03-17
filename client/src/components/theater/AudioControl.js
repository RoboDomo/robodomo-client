//import React, { useState } from "react";
import React from "react";

import { ButtonGroup, Glyphicon } from "react-bootstrap";
import MQTTButton from "components/common/MQTTButton";

const AudioControl = () => {
  return (
    <>
      <ButtonGroup vertical>
        <h5>Master Volume</h5>
        <MQTTButton name="mute">
          <Glyphicon glyph="volume-off" />
        </MQTTButton>
        <MQTTButton name="volume-up">
          <Glyphicon glyph="volume-up" />
        </MQTTButton>
        <MQTTButton name="volume-down">
          <Glyphicon glyph="volume-down" />
        </MQTTButton>
      </ButtonGroup>
      <ButtonGroup vertical>
        <h5>Center Channel</h5>
        <MQTTButton name="center-up">
          <Glyphicon glyph="volume-up" />
        </MQTTButton>
        <MQTTButton name="center-down">
          <Glyphicon glyph="volume-down" />
        </MQTTButton>
      </ButtonGroup>
      <ButtonGroup vertical>
        <h5>Surround Mode</h5>
        <MQTTButton name="auto">Auto</MQTTButton>
        <MQTTButton name="movie">Movie</MQTTButton>
        <MQTTButton name="music">Music</MQTTButton>
      </ButtonGroup>
    </>
  );
};
export default AudioControl;
