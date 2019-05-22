import React from "react";

import {
  //  Row,
  //  Col,
  ButtonGroup
  //  Tooltip,
  //  OverlayTrigger
} from "react-bootstrap";

import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPowerOff,
  FaVolumeMute,
  FaVolumeUp,
  FaVolumeDown,
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  //  FaStepForward,
  FaForward,
  FaFastForward
  //  FaDotCircle
} from "react-icons/fa";

import useBravia from "common/hooks/useBravia";
import ActionButton from "common/ActionButton";

//import Config from "Config";

const BraviaControl = ({ config }) => {
  //  ({ bravia, tvInput, avrInput }) => {
  const tv = useBravia(config),
    dispatch = tv.dispatch;
  //  const status_topic = Config.mqtt.bravia + "/" + config.device + "/status/",
  //    set_topic = status_topic.replace("status", "set") + "command";

  const renderJoystick = () => {
    return (
      <>
        <ButtonGroup>
          <ActionButton variant="none" />
          <ActionButton dispatch={dispatch} action="CursorUp">
            <FaChevronUp />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="ChannelUp" variant="info">
            +
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton dispatch={dispatch} action="CursorLeft">
            <FaChevronLeft />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="Enter" variant="primary">
            Select
          </ActionButton>
          <ActionButton dispatch={dispatch} action="CursorRight">
            <FaChevronRight />
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton variant="none" />
          <ActionButton dispatch={dispatch} action="CursorDown">
            <FaChevronDown />
          </ActionButton>
          <ActionButton dispatch={dispatch} action="ChannelDown" variant="info">
            -
          </ActionButton>
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
            <ActionButton dispatch={dispatch} action="Num1">
              1
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Num2">
              2
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Num3">
              3
            </ActionButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <ActionButton dispatch={dispatch} action="Num4">
              4
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Num5">
              5
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Num6">
              6
            </ActionButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <ActionButton dispatch={dispatch} action="Num7">
              7
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Num8">
              8
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Num9">
              9
            </ActionButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <ActionButton dispatch={dispatch} action="Clear">
              .
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Num0">
              0
            </ActionButton>
            <ActionButton dispatch={dispatch} action="Enter">
              Enter
            </ActionButton>
          </ButtonGroup>
        </div>
      </div>
    );
  };

  const renderHDMI = () => {
    return (
      <ButtonGroup>
        <ActionButton
          variant={tv.input === "hdmi1" ? "success" : undefined}
          dispatch={dispatch}
          action="Hdmi1"
        >
          HDMI 1
        </ActionButton>
        <ActionButton
          variant={tv.input === "hdmi2" ? "success" : undefined}
          dispatch={dispatch}
          action="Hdmi2"
        >
          HDMI 2
        </ActionButton>
        <ActionButton
          variant={tv.input === "hdmi3" ? "success" : undefined}
          dispatch={dispatch}
          action="Hdmi3"
        >
          HDMI 3
        </ActionButton>
        <ActionButton
          variant={tv.input === "hdmi4" ? "success" : undefined}
          dispatch={dispatch}
          action="Hdmi4"
        >
          HDMI 4
        </ActionButton>
      </ButtonGroup>
    );
  };

  const renderLaunchPoints = () => {
    return (
      <ButtonGroup>
        <ActionButton dispatch={dispatch} action="LAUNCH-Netflix">
          Netflix
        </ActionButton>
        <ActionButton dispatch={dispatch} action="LAUNCH-Prime Video">
          Prime
        </ActionButton>
        <ActionButton dispatch={dispatch} action="LAUNCH-YouTube">
          YouTube
        </ActionButton>
        <ActionButton dispatch={dispatch} action="LAUNCH-HBO GO">
          HBO Go
        </ActionButton>
      </ButtonGroup>
    );
  };

  const renderControls = () => {
    const power = tv.power ? (
      <ActionButton dispatch={dispatch} action="PowerOff">
        <span style={{ fontWeight: "bold", color: "red" }}>
          <FaPowerOff /> Off
        </span>
      </ActionButton>
    ) : (
      <ActionButton dispatch={dispatch} action="WakeUp">
        <span style={{ fontWeight: "bold", color: "lightgreen" }}>
          <FaPowerOff /> On
        </span>
      </ActionButton>
    );
    return (
      <ButtonGroup>
        <ActionButton dispatch={dispatch} action="Return">
          Return
        </ActionButton>
        <ActionButton dispatch={dispatch} action="Display">
          Display
        </ActionButton>
        <ActionButton dispatch={dispatch} action="Home">
          Home
        </ActionButton>
        <ActionButton dispatch={dispatch} action="ActionMenu">
          Menu
        </ActionButton>
        {power}
      </ButtonGroup>
    );
  };

  const renderVolume = () => {
    const mute = tv && tv.volume ? tv.volume.mute : false;
    return (
      <>
        <ActionButton dispatch={dispatch} action="VolumeUp">
          <FaVolumeUp />
        </ActionButton>
        <ActionButton dispatch={dispatch} action="VolumeDown">
          <FaVolumeDown />
        </ActionButton>
        <ActionButton
          variant={mute ? "danger" : undefined}
          dispatch={dispatch}
          action="Mute"
        >
          <FaVolumeMute />
        </ActionButton>
      </>
    );
  };

  const renderTransport = () => {
    return (
      <ButtonGroup>
        <ActionButton mini dispatch={dispatch} action="Prev">
          <FaFastBackward />
        </ActionButton>
        <ActionButton mini dispatch={dispatch} action="Rewind">
          <FaBackward />
        </ActionButton>
        <ActionButton mini dispatch={dispatch} action="Pause">
          <FaPause />
        </ActionButton>
        <ActionButton mini dispatch={dispatch} action="Play">
          <FaPlay />
        </ActionButton>
        <ActionButton mini dispatch={dispatch} action="Forward">
          <FaForward />
        </ActionButton>
        <ActionButton mini dispatch={dispatch} action="Next">
          <FaFastForward />
        </ActionButton>
      </ButtonGroup>
    );
  };
  // \\ // \\
  return (
    <>
      <div>
        <h4>
          {config.title} ({tv.power ? "ON" : "OFF"})
        </h4>
        {renderControls()}
      </div>
      <div style={{ marginTop: 4 }}>{renderVolume()}</div>
      <div style={{ marginTop: 4 }}>{renderJoystick()}</div>
      <div style={{ marginTop: 4 }}>{renderKeypad()}</div>
      <div style={{ marginTop: 4 }}>{renderHDMI()}</div>
      <div style={{ marginTop: 4 }}>{renderLaunchPoints()}</div>
      <div style={{ marginTop: 4 }}>{renderTransport()}</div>
    </>
  );
};

export default BraviaControl;
