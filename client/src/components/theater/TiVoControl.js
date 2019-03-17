import React from "react";

import RemoteButton from "components/common//RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

const style = {
  row: { marginTop: 4 }
};

const TiVoControl = ({ device }) => {
  const topic = "tivo/" + device + "/set";

  return (
    <>
      <Row>
        <ButtonGroup>
          <RemoteButton topic={topic} message="CLEAR">
            Clear
          </RemoteButton>
          <RemoteButton topic={topic} message="LIVETV">
            Live TV
          </RemoteButton>
          <RemoteButton topic={topic} message="TIVO" bsStyle="primary">
            Tivo
          </RemoteButton>
          <RemoteButton topic={topic} message="GUIDE">
            Guide
          </RemoteButton>
          <RemoteButton topic={topic} message="INFO">
            Info
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton topic={topic} message="THUMBSUP" bsStyle="success">
            <Glyphicon glyph="thumbs-up" />
          </RemoteButton>
          <RemoteButton topic={topic} message="BACK">
            Back
          </RemoteButton>
          <RemoteButton topic={topic} message="THUMBSDOWN" bsStyle="danger">
            <Glyphicon glyph="thumbs-down" />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton bsStyle="none" />
          <RemoteButton topic={topic} message="UP">
            <Glyphicon glyph="chevron-up" />
          </RemoteButton>
          <RemoteButton topic={topic} message="CHANNELUP" bsStyle="info">
            +
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={topic} message="LEFT">
            <Glyphicon glyph="chevron-left" />
          </RemoteButton>
          <RemoteButton topic={topic} message="SELECT" bsStyle="primary">
            Select
          </RemoteButton>
          <RemoteButton topic={topic} message="RIGHT">
            <Glyphicon glyph="chevron-right" />
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton bsStyle="none" />
          <RemoteButton topic={topic} message="DOWN">
            <Glyphicon glyph="chevron-down" />
          </RemoteButton>
          <RemoteButton topic={topic} message="CHANNELDOWN" bsStyle="info">
            -
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton topic={topic} message="A" bsStyle="warning">
            A
          </RemoteButton>
          <RemoteButton topic={topic} message="B" bsStyle="primary">
            B
          </RemoteButton>
          <RemoteButton topic={topic} message="C" bsStyle="danger">
            C
          </RemoteButton>
          <RemoteButton topic={topic} message="D" bsStyle="success">
            D
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton topic={topic} message="NUM1">
            1
          </RemoteButton>
          <RemoteButton topic={topic} message="NUM2">
            2
          </RemoteButton>
          <RemoteButton topic={topic} message="NUM3">
            3
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={topic} message="NUM4">
            4
          </RemoteButton>
          <RemoteButton topic={topic} message="NUM5">
            5
          </RemoteButton>
          <RemoteButton topic={topic} message="NUM6">
            6
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={topic} message="NUM7">
            7
          </RemoteButton>
          <RemoteButton topic={topic} message="NUM8">
            8
          </RemoteButton>
          <RemoteButton topic={topic} message="NUM9">
            9
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={topic} message="CLEAR">
            .
          </RemoteButton>
          <RemoteButton topic={topic} message="NUM0">
            0
          </RemoteButton>
          <RemoteButton topic={topic} message="ENTER">
            Enter
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <ButtonGroup>
          <RemoteButton topic={topic} message="REPLAY" mini>
            <Glyphicon glyph="fast-backward" />
          </RemoteButton>
          <RemoteButton topic={topic} message="REVERSE" mini>
            <Glyphicon glyph="backward" />
          </RemoteButton>
          <RemoteButton topic={topic} message="PAUSE" mini>
            <Glyphicon glyph="pause" />
          </RemoteButton>
          <RemoteButton topic={topic} message="PLAY" mini>
            <Glyphicon glyph="play" />
          </RemoteButton>
          <RemoteButton topic={topic} message="SLOW" mini>
            <Glyphicon glyph="step-forward" />
          </RemoteButton>
          <RemoteButton topic={topic} message="FORWARD" mini>
            <Glyphicon glyph="forward" />
          </RemoteButton>
          <RemoteButton topic={topic} message="ADVANCE" mini>
            <Glyphicon glyph="fast-forward" />
          </RemoteButton>
          <RemoteButton topic={topic} message="RECORD" mini bsStyle="danger">
            <Glyphicon glyph="record" />
          </RemoteButton>
        </ButtonGroup>
      </Row>
    </>
  );
};
export default TiVoControl;
