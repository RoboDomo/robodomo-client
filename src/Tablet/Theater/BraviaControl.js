import React from "react";

import {
  Row,
  Col,
  ButtonGroup,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaForward,
  FaFastForward,
  FaDotCircle
} from "react-icons/fa";

import RemoteButton from "common/RemoteButton";

import Config from "Config";

const BraviaControl = ({ bravia, tvInput, avrInput }) => {
  const status_topic = Config.mqtt.bravia + "/" + bravia.device + "/status/",
    //    status_topic_length = status_topic.length,
    set_topic = status_topic.replace("status", "set") + "command";

  console.log("bravia", bravia, status_topic);
  const renderJoystick = () => {
    return (
      <>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={set_topic} message="UP">
            <FaChevronUp />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="CHANNELUP" variant="info">
            +
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={set_topic} message="LEFT">
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="SELECT" variant="primary">
            Select
          </RemoteButton>
          <RemoteButton topic={set_topic} message="RIGHT">
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={set_topic} message="DOWN">
            <FaChevronDown />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="CHANNELDOWN" variant="info">
            -
          </RemoteButton>
        </ButtonGroup>
      </>
    );
  };
  const renderKeypad = () => {
    //    if (!bravia.tuner) {
    //      return null;
    //    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ flex: 1 }}>
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="NUM1">
              1
            </RemoteButton>
            <RemoteButton topic={set_topic} message="NUM2">
              2
            </RemoteButton>
            <RemoteButton topic={set_topic} message="NUM3">
              3
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="NUM4">
              4
            </RemoteButton>
            <RemoteButton topic={set_topic} message="NUM5">
              5
            </RemoteButton>
            <RemoteButton topic={set_topic} message="NUM6">
              6
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="NUM7">
              7
            </RemoteButton>
            <RemoteButton topic={set_topic} message="NUM8">
              8
            </RemoteButton>
            <RemoteButton topic={set_topic} message="NUM9">
              9
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="CLEAR">
              .
            </RemoteButton>
            <RemoteButton topic={set_topic} message="NUM0">
              0
            </RemoteButton>
            <RemoteButton topic={set_topic} message="ENTER">
              Enter
            </RemoteButton>
          </ButtonGroup>
        </div>
      </div>
    );
  };

  const renderHDMI = () => {
    return (
      <ButtonGroup>
        <RemoteButton variant={tvInput === "hdmi1" ? "primary" : undefined}>
          HDMI 1
        </RemoteButton>
        <RemoteButton variant={tvInput === "hdmi2" ? "primary" : undefined}>
          HDMI 2
        </RemoteButton>
        <RemoteButton variant={tvInput === "hdmi3" ? "primary" : undefined}>
          HDMI 3
        </RemoteButton>
        <RemoteButton variant={tvInput === "hdmi4" ? "primary" : undefined}>
          HDMI 4
        </RemoteButton>
      </ButtonGroup>
    );
  };

  const renderLaunchPoints = () => {
    return (
      <ButtonGroup>
        <RemoteButton>Netflix</RemoteButton>
        <RemoteButton>Prime</RemoteButton>
        <RemoteButton>YouTube</RemoteButton>
        <RemoteButton>CBS</RemoteButton>
      </ButtonGroup>
    );
  };

  return (
    <>
      <div>
        <h4>{bravia.title}</h4>
        <ButtonGroup>
          <RemoteButton>Return</RemoteButton>
          <RemoteButton>Display</RemoteButton>
          <RemoteButton>Home</RemoteButton>
          <RemoteButton>Menu</RemoteButton>
          <RemoteButton>Power</RemoteButton>
        </ButtonGroup>
      </div>
      <div style={{ marginTop: 8 }}>{renderJoystick()}</div>
      <div style={{ marginTop: 8 }}>{renderKeypad()}</div>
      <div style={{ marginTop: 8 }}>{renderHDMI()}</div>
      <div style={{ marginTop: 8 }}>{renderLaunchPoints()}</div>
    </>
  );
};

export default BraviaControl;
