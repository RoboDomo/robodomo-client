import React from "react";

import RemoteButton from "common//RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaThumbsUp,
  FaThumbsDown,
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaForward,
  FaFastForward,
  FaDotCircle
} from "react-icons/fa";

const style = {
  row: {
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const TiVoControl = ({ device }) => {
  const topic = "tivo/" + device + "/set";

  return (
    <>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ButtonGroup>
          <RemoteButton topic={topic} message="CLEAR">
            Clear
          </RemoteButton>
          <RemoteButton topic={topic} message="LIVETV">
            Live TV
          </RemoteButton>
          <RemoteButton topic={topic} message="TIVO" variant="primary">
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
          <RemoteButton topic={topic} message="THUMBSUP" variant="success">
            <FaThumbsUp />
          </RemoteButton>
          <RemoteButton topic={topic} message="BACK">
            Back
          </RemoteButton>
          <RemoteButton topic={topic} message="THUMBSDOWN" variant="danger">
            <FaThumbsDown />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={topic} message="UP">
            <FaChevronUp />
          </RemoteButton>
          <RemoteButton topic={topic} message="CHANNELUP" variant="info">
            +
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={topic} message="LEFT">
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton topic={topic} message="SELECT" variant="primary">
            Select
          </RemoteButton>
          <RemoteButton topic={topic} message="RIGHT">
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={topic} message="DOWN">
            <FaChevronDown />
          </RemoteButton>
          <RemoteButton topic={topic} message="CHANNELDOWN" variant="info">
            -
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton topic={topic} message="A" variant="warning">
            A
          </RemoteButton>
          <RemoteButton topic={topic} message="B" variant="primary">
            B
          </RemoteButton>
          <RemoteButton topic={topic} message="C" variant="danger">
            C
          </RemoteButton>
          <RemoteButton topic={topic} message="D" variant="success">
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
      <Row style={{ ...style.row, marginTop: 10 }}>
        <ButtonGroup>
          <RemoteButton topic={topic} message="REPLAY" mini>
            <FaFastBackward />
          </RemoteButton>
          <RemoteButton topic={topic} message="REVERSE" mini>
            <FaBackward />
          </RemoteButton>
          <RemoteButton topic={topic} message="PAUSE" mini>
            <FaPause />
          </RemoteButton>
          <RemoteButton topic={topic} message="PLAY" mini>
            <FaPlay />
          </RemoteButton>
          <RemoteButton topic={topic} message="SLOW" mini>
            <FaStepForward />
          </RemoteButton>
          <RemoteButton topic={topic} message="FORWARD" mini>
            <FaForward />
          </RemoteButton>
          <RemoteButton topic={topic} message="ADVANCE" mini>
            <FaFastForward />
          </RemoteButton>
          <RemoteButton topic={topic} message="RECORD" mini variant="danger">
            <FaDotCircle />
          </RemoteButton>
        </ButtonGroup>
      </Row>
    </>
  );
};
export default TiVoControl;
