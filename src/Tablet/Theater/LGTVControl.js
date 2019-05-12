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

import MQTT from "lib/MQTT";

const ignoredLaunchPoints = [
  "HDMI1",
  "HDMI2",
  "HDMI3",
  "HDMI4",
  "HDMI 1",
  "HDMI 2",
  "HDMI 3",
  "HDMI 4",
  "Web Browser",
  "User Guide",
  "Device Connector",
  "Music",
  "Photo & Video",
  "GALLERY",
  "TV Scheduler",
  "Screen Share",
  "Multi-view",
  "Accessibility",
  "Notifications",
  "Set Up TV for Google Assistant",
  "Set Up TV for Amazon Alexa",
  "LG Remote Service"
];

// If props.lgtv.tuner is set to true, then additional controls are rendered.
// Number pad, for example, is not needed for smart TV apps, but are needed
// for watching TV.
const LGTVControl = ({ lgtv, tvInput, avrInput }) => {
  const status_topic = Config.mqtt.lgtv + "/" + lgtv.device + "/status/",
    //    status_topic_length = status_topic.length,
    set_topic = status_topic.replace("status", "set") + "command";

  const foregroundApp = lgtv.foregroundApp,
    launchPoints = lgtv.launchPoints,
    apps = {};

  console.log("launchPoints", launchPoints);
  try {
    for (const index of Object.keys(launchPoints)) {
      const info = launchPoints[index];
      apps[info.title.replace(/\s+/g, "")] = info;
    }
  } catch (e) {}

  const renderLaunchPoints = () => {
    if (!launchPoints) {
      return null;
    }
    if (lgtv.tuner) {
      return (
        <Row style={{ marginTop: 4 }}>
          <ButtonGroup>
            <RemoteButton>Netflix</RemoteButton>
            <RemoteButton>Prime</RemoteButton>
            <RemoteButton>YouTube</RemoteButton>
            <RemoteButton>CBS</RemoteButton>
          </ButtonGroup>
        </Row>
      );
    }

    return (
      <>
        {Object.keys(lgtv.launchPoints).map(key => {
          const info = lgtv.launchPoints[key];
          if (~ignoredLaunchPoints.indexOf(info.title)) {
            //            console.log("LGTV", info);
            return null;
          }
          const ttkey = `tt-${info.id}`,
            okey = `o-${ttkey}`,
            overlay = (
              <Tooltip id={info.title} key={ttkey}>
                {info.title}
              </Tooltip>
            );
          return (
            <div
              style={{ marginRight: 10, marginBottom: 10, float: "left" }}
              key={info.id}
              onClick={() => {
                console.log("click", info);
                MQTT.publish(`${set_topic}`, `LAUNCH-${info.id}`);
              }}
            >
              <OverlayTrigger key={okey} overlay={overlay}>
                <img
                  alt={info.title}
                  style={{ maxWidth: 40, minHeight: 40 }}
                  src={info.icon}
                />
              </OverlayTrigger>
            </div>
          );
        })}
      </>
    );
  };

  const renderNowPlaying = () => {
    if (!foregroundApp) {
      return null;
    }
    const appId = foregroundApp.appId,
      app = launchPoints[appId];

    if (!app || true) {
      return null;
    }
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginLeft: "auto", marginRight: "auto", width: 100 }}>
          <img alt={app.icon} src={app.icon}>
            {app.title}
          </img>
        </div>
      </div>
    );
  };

  const renderHDMI = () => {
    return (
      <ButtonGroup>
        <RemoteButton
          topic={set_topic}
          message="LAUNCH-com.webos.app.hdmi1"
          variant={tvInput === "hdmi1" ? "success" : undefined}
        >
          HDMI 1
        </RemoteButton>
        <RemoteButton
          topic={set_topic}
          message="LAUNCH-com.webos.app.hdmi2"
          variant={tvInput === "hdmi2" ? "success" : undefined}
        >
          HDMI 2
        </RemoteButton>
        <RemoteButton
          topic={set_topic}
          message="LAUNCH-com.webos.app.hdmi3"
          variant={tvInput === "hdmi3" ? "success" : undefined}
        >
          HDMI 3
        </RemoteButton>
        <RemoteButton
          topic={set_topic}
          message="LAUNCH-com.webos.app.hdmi4"
          variant={tvInput === "hdmi4" ? "success" : undefined}
        >
          HDMI 4
        </RemoteButton>
      </ButtonGroup>
    );
  };

  const renderKeypad = () => {
    //    if (!lgtv.tuner) {
    //      return null;
    //    }
    return (
      <>
        <div style={{ marginTop: 4 }}>
          <RemoteButton topic={set_topic} message="KEY_BACK">
            Back
          </RemoteButton>
          <RemoteButton topic={set_topic} message="KEY_MENU">
            Menu
          </RemoteButton>
          <RemoteButton topic={set_topic} message="KEY_HOME">
            Home
          </RemoteButton>
          <RemoteButton topic={set_topic} message="KEY_GUIDE">
            Guide
          </RemoteButton>
        </div>
        <div style={{ marginTop: 4 }}>
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="KEY_NUM1">
              1
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_NUM2">
              2
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_NUM3">
              3
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="KEY_NUM4">
              4
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_NUM5">
              5
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_NUM6">
              6
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="KEY_NUM7">
              7
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_NUM8">
              8
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_NUM9">
              9
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={set_topic} message="KEY_CLEAR">
              .
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_NUM0">
              0
            </RemoteButton>
            <RemoteButton topic={set_topic} message="KEY_ENTER">
              Enter
            </RemoteButton>
          </ButtonGroup>
        </div>
      </>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 48 * 10 }}>{renderLaunchPoints()}</div>
      <div>{renderNowPlaying()}</div>
      <div style={{ marginTop: 4 }}>{renderHDMI()}</div>
      <div style={{ margin: 10 }}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={set_topic} message="KEY_UP">
            <FaChevronUp />
          </RemoteButton>
          <RemoteButton
            topic={set_topic}
            message="KEY_CHANNELUP"
            variant="info"
          >
            +
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={set_topic} message="KEY_LEFT">
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="KEY_ENTER" variant="primary">
            Select
          </RemoteButton>
          <RemoteButton topic={set_topic} message="KEY_RIGHT">
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton topic={set_topic} message="KEY_DOWN">
            <FaChevronDown />
          </RemoteButton>
          <RemoteButton
            topic={set_topic}
            message="KEY_CHANNELDOWN"
            variant="info"
          >
            -
          </RemoteButton>
        </ButtonGroup>
      </div>
      <div>{renderKeypad()}</div>
      <div style={{ marginTop: 4 }}>
        <ButtonGroup>
          <RemoteButton topic={set_topic} message="REPLAY" mini>
            <FaFastBackward />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="REVERSE" mini>
            <FaBackward />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="PAUSE" mini>
            <FaPause />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="PLAY" mini>
            <FaPlay />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="SLOW" mini>
            <FaStepForward />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="FORWARD" mini>
            <FaForward />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="ADVANCE" mini>
            <FaFastForward />
          </RemoteButton>
          <RemoteButton
            topic={set_topic}
            message="RECORD"
            mini
            variant="danger"
          >
            <FaDotCircle />
          </RemoteButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default LGTVControl;
