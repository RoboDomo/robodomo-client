import React, { Component } from "react";

import RemoteButton from "components/common/RemoteButton";
import {
  Row,
  Col,
  ButtonGroup,
  Glyphicon,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

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

export default class LGTVControl extends Component {
  constructor(props) {
    super(props);
    this.lgtv = props.lgtv;
    console.log("constructor", this.lgtv);
  }
  renderLaunchPoints() {
    if (!this.lgtv.launchPoints) {
      return null;
    }
    if (this.lgtv.tuner) {
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
        {Object.keys(this.lgtv.launchPoints).map(key => {
          const info = this.lgtv.launchPoints[key];
          if (~ignoredLaunchPoints.indexOf(info.title)) {
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
  }
  renderKeypad() {
    if (!this.lgtv.tuner) {
      return null;
    }
    return (
      <>
        <Row style={{ marginTop: 4 }}>
          <RemoteButton topic={this.topic} message="Back">
            Back
          </RemoteButton>
          <RemoteButton topic={this.topic} message="Guide">
            Home
          </RemoteButton>
          <RemoteButton topic={this.topic} message="Guide">
            Guide
          </RemoteButton>
        </Row>
        <Row style={{ marginTop: 4 }}>
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="NUM1">
              1
            </RemoteButton>
            <RemoteButton topic={this.topic} message="NUM2">
              2
            </RemoteButton>
            <RemoteButton topic={this.topic} message="NUM3">
              3
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="NUM4">
              4
            </RemoteButton>
            <RemoteButton topic={this.topic} message="NUM5">
              5
            </RemoteButton>
            <RemoteButton topic={this.topic} message="NUM6">
              6
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="NUM7">
              7
            </RemoteButton>
            <RemoteButton topic={this.topic} message="NUM8">
              8
            </RemoteButton>
            <RemoteButton topic={this.topic} message="NUM9">
              9
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="CLEAR">
              .
            </RemoteButton>
            <RemoteButton topic={this.topic} message="NUM0">
              0
            </RemoteButton>
            <RemoteButton topic={this.topic} message="ENTER">
              Enter
            </RemoteButton>
          </ButtonGroup>
        </Row>
      </>
    );
  }
  render() {
    return (
      <>
        <Row style={{ margin: "auto", marginTop: 4, marginBottom: 10 }}>
          <Col sm={12}>
            <div style={{ width: 48 * 10 }}>{this.renderLaunchPoints()}</div>
          </Col>
        </Row>
        <Row style={{ marginTop: 4 }}>
          <ButtonGroup>
            <RemoteButton>HDMI 1</RemoteButton>
            <RemoteButton>HDMI 2</RemoteButton>
            <RemoteButton>HDMI 3</RemoteButton>
            <RemoteButton>HDMI 4</RemoteButton>
          </ButtonGroup>
        </Row>
        <Row style={{ margin: 10 }}>
          <ButtonGroup>
            <RemoteButton bsStyle="none" />
            <RemoteButton topic={this.topic} message="UP">
              <Glyphicon glyph="chevron-up" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="CHANNELUP" bsStyle="info">
              +
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="LEFT">
              <Glyphicon glyph="chevron-left" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="SELECT" bsStyle="primary">
              Select
            </RemoteButton>
            <RemoteButton topic={this.topic} message="RIGHT">
              <Glyphicon glyph="chevron-right" />
            </RemoteButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <RemoteButton bsStyle="none" />
            <RemoteButton topic={this.topic} message="DOWN">
              <Glyphicon glyph="chevron-down" />
            </RemoteButton>
            <RemoteButton
              topic={this.topic}
              message="CHANNELDOWN"
              bsStyle="info"
            >
              -
            </RemoteButton>
          </ButtonGroup>
        </Row>
        <Row>{this.renderKeypad()}</Row>
        <Row style={{ marginTop: 4 }}>
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="REPLAY" mini>
              <Glyphicon glyph="fast-backward" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="REVERSE" mini>
              <Glyphicon glyph="backward" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="PAUSE" mini>
              <Glyphicon glyph="pause" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="PLAY" mini>
              <Glyphicon glyph="play" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="SLOW" mini>
              <Glyphicon glyph="step-forward" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="FORWARD" mini>
              <Glyphicon glyph="forward" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="ADVANCE" mini>
              <Glyphicon glyph="fast-forward" />
            </RemoteButton>
            <RemoteButton
              topic={this.topic}
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
  }
}
