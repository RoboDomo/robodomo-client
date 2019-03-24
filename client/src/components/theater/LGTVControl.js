import React from "react";

import RemoteButton from "components/common/RemoteButton";
import {
  Row,
  Col,
  ButtonGroup,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
  Thumbnail
} from "react-bootstrap";
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
          <Thumbnail src={app.icon}>{app.title}</Thumbnail>
        </div>
      </div>
    );
  };

  const renderHDMI = () => {
    return (
      <ButtonGroup>
        <RemoteButton bsStyle={tvInput === "hdmi1" ? "primary" : undefined}>
          HDMI 1
        </RemoteButton>
        <RemoteButton bsStyle={tvInput === "hdmi2" ? "primary" : undefined}>
          HDMI 2
        </RemoteButton>
        <RemoteButton bsStyle={tvInput === "hdmi3" ? "primary" : undefined}>
          HDMI 3
        </RemoteButton>
        <RemoteButton bsStyle={tvInput === "hdmi4" ? "primary" : undefined}>
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
          <RemoteButton bsStyle="none" />
          <RemoteButton topic={set_topic} message="UP">
            <Glyphicon glyph="chevron-up" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="CHANNELUP" bsStyle="info">
            +
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton topic={set_topic} message="LEFT">
            <Glyphicon glyph="chevron-left" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="SELECT" bsStyle="primary">
            Select
          </RemoteButton>
          <RemoteButton topic={set_topic} message="RIGHT">
            <Glyphicon glyph="chevron-right" />
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton bsStyle="none" />
          <RemoteButton topic={set_topic} message="DOWN">
            <Glyphicon glyph="chevron-down" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="CHANNELDOWN" bsStyle="info">
            -
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row>{renderKeypad()}</Row>
      <Row style={{ marginTop: 4 }}>
        <ButtonGroup>
          <RemoteButton topic={set_topic} message="REPLAY" mini>
            <Glyphicon glyph="fast-backward" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="REVERSE" mini>
            <Glyphicon glyph="backward" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="PAUSE" mini>
            <Glyphicon glyph="pause" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="PLAY" mini>
            <Glyphicon glyph="play" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="SLOW" mini>
            <Glyphicon glyph="step-forward" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="FORWARD" mini>
            <Glyphicon glyph="forward" />
          </RemoteButton>
          <RemoteButton topic={set_topic} message="ADVANCE" mini>
            <Glyphicon glyph="fast-forward" />
          </RemoteButton>
          <RemoteButton
            topic={set_topic}
            message="RECORD"
            mini
            bsStyle="danger"
          >
            <Glyphicon glyph="record" />
          </RemoteButton>
        </ButtonGroup>
      </Row>
    </>
  );
};
export default LGTVControl;
