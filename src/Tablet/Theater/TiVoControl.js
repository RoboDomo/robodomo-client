import React from "react";

import ActionButton from "common//ActionButton";
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

import useTiVo from "common/hooks/useTiVo";

const style = {
  row: {
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const TiVoControl = ({ config }) => {
  const tivo = useTiVo(config),
    dispatch = tivo.dispatch;

  return (
    <>
      <h4>Channel: {tivo.channel}</h4>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="clear">
            Clear
          </ActionButton>
          <ActionButton dispatch={dispatch} action="livetv">
            Live TV
          </ActionButton>
          <ActionButton dispatch={dispatch} action="tivo" variant="primary">
            TiVo
          </ActionButton>
          <ActionButton dispatch={dispatch} action="guide">
            Guide
          </ActionButton>
          <ActionButton dispatch={dispatch} action="info">
            Info
          </ActionButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="thumbsup" variant="success">
            <FaThumbsUp />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="back">
            Back
          </ActionButton>
          <ActionButton
            dispatch={dispatch}
            action="thumbsdown"
            variant="danger"
          >
            <FaThumbsDown />
          </ActionButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <ActionButton variant="none" />
          <ActionButton dispatch={dispatch} action="up">
            <FaChevronUp />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="channelup" variant="info">
            +
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="left">
            <FaChevronLeft />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="select" variant="primary">
            Select
          </ActionButton>
          <ActionButton dispatch={dispatch} action="right">
            <FaChevronRight />
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton variant="none" />
          <ActionButton dispatch={dispatch} action="down">
            <FaChevronDown />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="channeldown" variant="info">
            -
          </ActionButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="a" variant="warning">
            A
          </ActionButton>
          <ActionButton dispatch={dispatch} action="b" variant="primary">
            B
          </ActionButton>
          <ActionButton dispatch={dispatch} action="c" variant="danger">
            C
          </ActionButton>
          <ActionButton dispatch={dispatch} action="d" variant="success">
            D
          </ActionButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="num1">
            1
          </ActionButton>
          <ActionButton dispatch={dispatch} action="num2">
            2
          </ActionButton>
          <ActionButton dispatch={dispatch} action="num3">
            3
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="num4">
            4
          </ActionButton>
          <ActionButton dispatch={dispatch} action="num5">
            5
          </ActionButton>
          <ActionButton dispatch={dispatch} action="num6">
            6
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="num7">
            7
          </ActionButton>
          <ActionButton dispatch={dispatch} action="num8">
            8
          </ActionButton>
          <ActionButton dispatch={dispatch} action="num9">
            9
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="clear">
            .
          </ActionButton>
          <ActionButton dispatch={dispatch} action="num0">
            0
          </ActionButton>
          <ActionButton dispatch={dispatch} action="enter">
            Enter
          </ActionButton>
        </ButtonGroup>
      </Row>
      <Row style={{ ...style.row, marginTop: 10 }}>
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="replay" mini>
            <FaFastBackward />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="reverse" mini>
            <FaBackward />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="pause" mini>
            <FaPause />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="play" mini>
            <FaPlay />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="slow" mini>
            <FaStepForward />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="forward" mini>
            <FaForward />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="advance" mini>
            <FaFastForward />
          </ActionButton>
          <ActionButton
            dispatch={dispatch}
            action="record"
            mini
            variant="danger"
          >
            <FaDotCircle />
          </ActionButton>
        </ButtonGroup>
      </Row>
    </>
  );
};

export default TiVoControl;
