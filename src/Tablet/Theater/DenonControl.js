import React from "react";

import { Row, ButtonGroup } from "react-bootstrap";

import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import ActionButton from "common/ActionButton";

import useDenon from "common/hooks/useDenon";

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const DenonControl = ({ config }) => {
  const avr = useDenon(config),
    input = avr.input,
    dispatch = avr.dispatch;

  const renderInputs = () => {
    return (
      <>
        <Row style={{ ...rowStyle, marginTop: 4 }}>
          <ButtonGroup>
            <ActionButton
              variant={input === "TV" ? "success" : undefined}
              dispatch={dispatch}
              action="tv"
            >
              TV Audio
            </ActionButton>
            <ActionButton
              variant={input === "DVD" ? "success" : undefined}
              dispatch={dispatch}
              action="dvd"
            >
              DVD
            </ActionButton>
            <ActionButton
              variant={input === "BD" ? "success" : undefined}
              dispatch={dispatch}
              action="blueray"
            >
              Blu Ray
            </ActionButton>
            <ActionButton
              variant={input === "SAT/CBL" ? "success" : undefined}
              dispatch={dispatch}
              action="satcbl"
            >
              SAT/CBL
            </ActionButton>
            <ActionButton
              variant={input === "MPLAY" ? "success" : undefined}
              dispatch={dispatch}
              action="mplayer"
            >
              MPlayer
            </ActionButton>
          </ButtonGroup>
        </Row>
      </>
    );
  };

  const renderJoystick = () => {
    return (
      <>
        <Row style={{ ...rowStyle, marginTop: 20 }}>
          <ButtonGroup>
            <ActionButton dispatch={dispatch} action="menuon">
              Menu On
            </ActionButton>
            <ActionButton dispatch={dispatch} action="up">
              <FaChevronUp />
            </ActionButton>
            <ActionButton dispatch={dispatch} action="menuoff">
              Menu Off
            </ActionButton>
          </ButtonGroup>
        </Row>
        <Row style={rowStyle}>
          <ButtonGroup>
            <ActionButton dispatch={dispatch} action="left">
              <FaChevronLeft />
            </ActionButton>
            <ActionButton dispatch={dispatch} action="enter">
              Select
            </ActionButton>
            <ActionButton dispatch={dispatch} action="right">
              <FaChevronRight />
            </ActionButton>
          </ButtonGroup>
        </Row>
        <Row style={rowStyle}>
          <ButtonGroup>
            <ActionButton dispatch={dispatch} action="return">
              Return
            </ActionButton>
            <ActionButton dispatch={dispatch} action="down">
              <FaChevronDown />
            </ActionButton>
            <ActionButton variant="none" />
          </ButtonGroup>
        </Row>
      </>
    );
  };
  return (
    <>
      {renderInputs()}
      {renderJoystick()}
    </>
  );
};

export default DenonControl;
