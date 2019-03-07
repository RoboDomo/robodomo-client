import React, { Component } from "react";

import RemoteButton from "components/common//RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

const style = {
  row: { marginTop: 4 }
};

export default class TivoControl extends Component {
  constructor(props) {
    super(props);
    this.device = props.device;
    this.topic = "tivo/" + this.device + "/set";
  }

  render() {
    return (
      <>
        <Row>
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="CLEAR">
              Clear
            </RemoteButton>
            <RemoteButton topic={this.topic} message="LIVETV">
              Live TV
            </RemoteButton>
            <RemoteButton topic={this.topic} message="TIVO" bsStyle="primary">
              Tivo
            </RemoteButton>
            <RemoteButton topic={this.topic} message="GUIDE">
              Guide
            </RemoteButton>
            <RemoteButton topic={this.topic} message="INFO">
              Info
            </RemoteButton>
          </ButtonGroup>
        </Row>
        <Row style={style.row}>
          <ButtonGroup>
            <RemoteButton
              topic={this.topic}
              message="THUMBSUP"
              bsStyle="success"
            >
              <Glyphicon glyph="thumbs-up" />
            </RemoteButton>
            <RemoteButton topic={this.topic} message="BACK">
              Back
            </RemoteButton>
            <RemoteButton
              topic={this.topic}
              message="THUMBSDOWN"
              bsStyle="danger"
            >
              <Glyphicon glyph="thumbs-down" />
            </RemoteButton>
          </ButtonGroup>
        </Row>
        <Row style={style.row}>
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
        <Row style={style.row}>
          <ButtonGroup>
            <RemoteButton topic={this.topic} message="A" bsStyle="warning">
              A
            </RemoteButton>
            <RemoteButton topic={this.topic} message="B" bsStyle="primary">
              B
            </RemoteButton>
            <RemoteButton topic={this.topic} message="C" bsStyle="danger">
              C
            </RemoteButton>
            <RemoteButton topic={this.topic} message="D" bsStyle="success">
              D
            </RemoteButton>
          </ButtonGroup>
        </Row>
        <Row style={style.row}>
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
        <Row style={{ marginTop: 10 }}>
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
  componentDidMount() {
    console.log("TiVoControl did mount");
  }
  componentWillUnmount() {
    console.log("TiVoControl will unmount");
  }
}
