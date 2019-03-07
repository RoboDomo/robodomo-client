import React, { Component } from "react";

import RemoteButton from "components/common/RemoteButton";
import { Row, ButtonGroup, Glyphicon } from "react-bootstrap";

import MQTT from "lib/MQTT";

const style = {
  row: { marginTop: 4 }
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
export default class AppleTVControl extends Component {
  constructor(props) {
    super(props);
    this.device = props.device;
    this.topic = "appletv/" + this.device + "/status";
    this.topic_length = this.topic.length;
    this.set_topic = this.topic.replace("status", "set/command");

    this.onInfoChange = this.onInfoChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.state = { elapsedTime: null };
  }

  renderPlaybackState() {
    const state = this.state;
    if (state.duration) {
      return (
        <>
          {state.playbackState.toUpperCase()} {formatTime(state.elapsedTime)} /{" "}
          {formatTime(state.duration)}
        </>
      );
    } else {
      return <>{state.playbackState.toUpperCase()}</>;
    }
  }
  renderNowPlaying() {
    const state = this.state;
    if (!state || !state.playbackState || state.elapsedTime == null) {
      return (
        <div style={{ height: 128 }}>
          <h1>Apple TV</h1>
          <h4>Not Playing</h4>
        </div>
      );
    }
    const app = appName(state.appDisplayName || state.appBundleIdentifier);
    return (
      <div style={{ height: 128 }}>
        <h1>{app}</h1>
        <h4>
          {state.artist} {state.album} {state.title}
          <br />
          <div style={{ fontWeight: "bold" }}>{this.renderPlaybackState()}</div>
        </h4>
      </div>
    );
  }
  renderPlaybackControls() {
    const playButton = (
        <RemoteButton topic={this.set_topic} message="TogglePlayPause" mini>
          <Glyphicon glyph="play" />
        </RemoteButton>
      ),
      pauseButton = (
        <RemoteButton topic={this.set_topic} message="TogglePlayPause" mini>
          <Glyphicon glyph="pause" />
        </RemoteButton>
      );

    return (
      <ButtonGroup>
        <RemoteButton topic={this.set_topic} message="SkipBackward" mini>
          <Glyphicon glyph="fast-backward" />
        </RemoteButton>
        <RemoteButton topic={this.set_topic} message="BeginRewind" mini>
          <Glyphicon glyph="backward" />
        </RemoteButton>
        {pauseButton}
        {playButton}
        <RemoteButton topic={this.set_topic} message="BeginFastFoward" mini>
          <Glyphicon glyph="forward" />
        </RemoteButton>
        <RemoteButton topic={this.set_topic} message="SkipForward" mini>
          <Glyphicon glyph="fast-forward" />
        </RemoteButton>
      </ButtonGroup>
    );
  }

  render() {
    return (
      <>
        <Row style={style.row}>{this.renderNowPlaying()}</Row>
        <Row>
          <ButtonGroup>
            <RemoteButton topic={this.set_topic} message="Stop">
              Stop
            </RemoteButton>
            <RemoteButton topic={this.set_topic} message="Menu">
              Menu
            </RemoteButton>
            <RemoteButton
              bsStyle="primary"
              topic={this.set_topic}
              message="Suspend"
            >
              Home
            </RemoteButton>
            <RemoteButton topic={this.set_topic} message="Power">
              Power
            </RemoteButton>
            <RemoteButton topic={this.set_topic} message="Reboot">
              Reboot
            </RemoteButton>
          </ButtonGroup>
        </Row>
        <Row style={style.row}>
          <ButtonGroup>
            <RemoteButton bsStyle="none" />
            <RemoteButton topic={this.set_topic} message="Up">
              <Glyphicon glyph="chevron-up" />
            </RemoteButton>
            <RemoteButton bsStyle="none" />
          </ButtonGroup>
        </Row>
        <Row>
          <ButtonGroup>
            <RemoteButton topic={this.set_topic} message="Left">
              <Glyphicon glyph="chevron-left" />
            </RemoteButton>
            <RemoteButton
              bsStyle="primary"
              topic={this.set_topic}
              message="Select"
            >
              Select
            </RemoteButton>
            <RemoteButton topic={this.set_topic} message="Right">
              <Glyphicon glyph="chevron-right" />
            </RemoteButton>
          </ButtonGroup>
        </Row>
        <Row>
          <ButtonGroup>
            <RemoteButton bsStyle="none" />
            <RemoteButton topic={this.set_topic} message="Down">
              <Glyphicon glyph="chevron-down" />
            </RemoteButton>
            <RemoteButton bsStyle="none" />
          </ButtonGroup>
        </Row>
        <Row style={{ marginTop: 20 }}>{this.renderPlaybackControls()}</Row>
      </>
    );
  }
  onInfoChange(topic, message) {
    if (!message) {
      this.setState({ elapsedTime: null });
    } else {
      console.dir(JSON.parse(message));
      this.setState(JSON.parse(message));
    }
  }

  onTimeChange(topic, message) {
    this.setState({
      elapsedTime: message
    });
  }

  componentDidMount() {
    MQTT.subscribe(this.topic + "/info", this.onInfoChange);
    MQTT.subscribe(this.topic + "/elapsedTime", this.onTimeChange);
  }
  componentWillUnmount() {
    MQTT.unsubscribe(this.topic + "/info", this.onInfoChange);
    MQTT.unsubscribe(this.topic + "/elapsedTime", this.onTimeChange);
  }
}
