import React, { useState, useEffect } from "react";

import RemoteButton from "common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBackward,
  FaPause,
  FaPlay,
  FaForward,
  FaFastForward
} from "react-icons/fa";

import MQTT from "lib/MQTT";

const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
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
  const topic = "appletv/" + device + "/status",
    set_topic = topic.replace("status", "set/command");

  const [elapsedTime, setElapsedTime] = useState(null);
  const [info, setInfo] = useState(null);

  const onInfoChange = (topic, message) => {
    if (!message) {
      setElapsedTime(null);
      setInfo(null);
    } else {
      let msg;
      try {
        msg = JSON.parse(message);
      } catch (e) {
        msg = message;
      }
      console.log("message", message);
      setInfo(prev => ({ ...prev, ...msg }));
    }
  };

  const onTimeChange = (topic, message) => {
    setElapsedTime(message);
  };

  useEffect(() => {
    MQTT.subscribe(topic + "/info", onInfoChange);
    MQTT.subscribe(topic + "/elapsedTime", onTimeChange);
    return () => {
      MQTT.unsubscribe(topic + "/info", onInfoChange);
      MQTT.unsubscribe(topic + "/elapsedTime", onTimeChange);
    };
  }, []);

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
    console.log("info", info);
    if (!info || !info.title) {
      return (
        <div style={{ height: 128 }}>
          <h1>Apple TV</h1>
          <h4>Not Playing</h4>
        </div>
      );
    }

    const app = appName(info.appDisplayName || info.appBundleIdentifier);
    return (
      <div>
        <h2>{app}</h2>
        <h4>
          {info.title}
          <br />
          {info.artist} {info.album}
          <br />
          <div style={{ fontWeight: "bold" }}>{renderPlayState()}</div>
        </h4>
      </div>
    );
  };

  const renderPlaybackControls = () => {
    const playButton = (
        <RemoteButton topic={set_topic} message="Play" mini>
          <FaPlay />
        </RemoteButton>
      ),
      pauseButton = (
        <RemoteButton topic={set_topic} message="Pause" mini>
          <FaPause />
        </RemoteButton>
      );

    return (
      <ButtonGroup>
        <RemoteButton topic={set_topic} message="SkipBackward" mini>
          <FaForward />
        </RemoteButton>
        <RemoteButton topic={set_topic} message="BeginRewind" mini>
          <FaBackward />
        </RemoteButton>
        {pauseButton}
        {playButton}
        <RemoteButton topic={set_topic} message="BeginForward" mini>
          <FaForward />
        </RemoteButton>
        <RemoteButton topic={set_topic} message="SkipForward" mini>
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
          <RemoteButton topic={set_topic} message="Stop">
            Stop
          </RemoteButton>
          <RemoteButton topic={set_topic} message="Menu">
            Menu
          </RemoteButton>
          <RemoteButton variant="primary" topic={set_topic} message="Suspend">
            Home
          </RemoteButton>
          <RemoteButton topic={set_topic} message="Power">
            Power
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={{ ...rowStyle, marginTop: 4 }}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={set_topic} message="Up">
            <FaChevronUp />
          </RemoteButton>
          <RemoteButton variant="none" />
        </ButtonGroup>
      </Row>
      <Row style={rowStyle}>
        <ButtonGroup>
          <RemoteButton topic={set_topic} message="Left">
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton variant="primary" topic={set_topic} message="Select">
            Select
          </RemoteButton>
          <RemoteButton topic={set_topic} message="Right">
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={rowStyle}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={set_topic} message="Down">
            <FaChevronDown />
          </RemoteButton>
          <RemoteButton variant="none" />
        </ButtonGroup>
      </Row>
      <Row style={{ ...rowStyle, marginTop: 20 }}>
        {renderPlaybackControls()}
      </Row>
    </>
  );
};

export default AppleTVControl;
