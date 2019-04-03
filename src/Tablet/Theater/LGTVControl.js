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

//import MQTT from "lib/MQTT";

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
            >
              <OverlayTrigger key={okey} overlay={overlay}>
                <img
                  alt={info.title}
                  style={{ maxWidth: 48, minHeight: 48 }}
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

  const renderKeypad = () => {
    if (!lgtv.tuner) {
      return null;
    }
    return (
      <>
        <Row style={{ marginTop: 4 }}>
          <RemoteButton topic={set_topic} message="Back">
            Back
          </RemoteButton>
          <RemoteButton topic={set_topic} message="Guide">
            Home
          </RemoteButton>
          <RemoteButton topic={set_topic} message="Guide">
            Guide
          </RemoteButton>
        </Row>
        <Row style={{ marginTop: 4 }}>
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
        </Row>
      </>
    );
  };
  return (
    <>
      <Row style={{ margin: "auto", marginTop: 4, marginBottom: 10 }}>
        <Col sm={12}>
          <div style={{ width: 48 * 10 }}>{renderLaunchPoints()}</div>
        </Col>
      </Row>
      <Row>{renderNowPlaying()}</Row>
      <Row style={{ marginTop: 4 }}>{renderHDMI()}</Row>
      <Row style={{ margin: 10 }}>
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
      </Row>
      <Row>{renderKeypad()}</Row>
      <Row style={{ marginTop: 4 }}>
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
      </Row>
    </>
  );
};

export default LGTVControl;
