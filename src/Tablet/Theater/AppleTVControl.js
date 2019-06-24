import React, { useReducer } from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaFastBackward,
  FaBackward,
  FaPause,
  FaPlay,
  FaForward,
  FaFastForward,
} from "react-icons/fa";

import useAppleTV from "@/hooks/useAppleTV";
import appleTVReducer from "@/hooks/reducers/appleTVReducer";

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formatTime = (seconds, trim = true) => {
  const d = new Date(null);
  d.setSeconds(seconds);
  const formatted = d.toISOString().substr(11, 8);
  if (trim && formatted.substr(0, 3) === "00:") {
    return formatted.substr(3);
  } else {
    return formatted;
  }
};

const appName = n => {
  if (n === "com.google.ios.youtube") {
    return "YouTube";
  }
  return n;
};

// appletv/device/set/command Pause

const AppleTVControl = ({ device }) => {
  const appleTV = useAppleTV(device),
    { info, elapsedTime } = appleTV;

  const [, dispatch] = useReducer(appleTVReducer, { device: device });

  const renderPlayState = () => {
    if (info.totalTime) {
      return (
        <>
          {info.playbackState.toUpperCase()} {formatTime(elapsedTime)} /{" "}
          {formatTime(info.totalTime)}
        </>
      );
    } else {
      return <>{info.playbackState.toUpperCase()}</>;
    }
  };

  const renderNowPlaying = () => {
    if (!info || !info.title) {
      return (
        <div style={{ height: 128 }}>
          <h1>Apple TV</h1>
          <h4>Not Playing</h4>
        </div>
      );
    }

    const app = appName(info.appDisplayName || info.appBundleIdentifier);
    const title = info.title !== info.album ? info.title : null;
    return (
      <div>
        <h2>{app}</h2>
        <h4>
          {title}
          <br />
          <span style={{ fontStyle: "italic" }}>{info.artist}</span> - {info.album}
          <br />
          <div style={{ fontWeight: "bold" }}>{renderPlayState()}</div>
        </h4>
      </div>
    );
  };

  const renderPlaybackControls = () => {
    const playButton = (
        <RemoteButton dispatch={dispatch} action="play" mini>
          <FaPlay />
        </RemoteButton>
      ),
      pauseButton = (
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaPause />
        </RemoteButton>
      );

    return (
      <ButtonGroup>
        <RemoteButton dispatch={dispatch} action="skipbackward" mini>
          <FaFastBackward />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="beginrewind" mini>
          <FaBackward />
        </RemoteButton>
        {pauseButton}
        {playButton}
        <RemoteButton dispatch={dispatch} action="beginforward" mini>
          <FaForward />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="skipforward" mini>
          <FaFastForward />
        </RemoteButton>
      </ButtonGroup>
    );
  };

  return (
    <>
      <Row style={{ ...rowStyle, marginTop: 4 }}> {renderNowPlaying()}</Row>
      <Row style={{ ...rowStyle, marginTop: 4 }}>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="stop">
            Stop
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="menu">
            Menu
          </RemoteButton>
          <RemoteButton variant="primary" dispatch={dispatch} action="home">
            Home
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="power" variant="danger">
            Power
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={{ ...rowStyle, marginTop: 4 }}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton dispatch={dispatch} action="up">
            <FaChevronUp />
          </RemoteButton>
          <RemoteButton variant="none" />
        </ButtonGroup>
      </Row>
      <Row style={rowStyle}>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="left">
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton variant="primary" dispatch={dispatch} action="select">
            Select
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="right">
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={rowStyle}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton dispatch={dispatch} action="down">
            <FaChevronDown />
          </RemoteButton>
          <RemoteButton variant="none" />
        </ButtonGroup>
      </Row>
      <Row style={{ ...rowStyle, marginTop: 20 }}>{renderPlaybackControls()}</Row>
    </>
  );
};

//
export default AppleTVControl;
