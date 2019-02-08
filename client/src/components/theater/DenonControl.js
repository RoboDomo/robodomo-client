import React, { Component } from "react";

import { ButtonGroup, Glyphicon } from "react-bootstrap";
import RemoteButton from "components/common/RemoteButton";

export default class DenonControl extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <>
        <ButtonGroup vertical>
          Master Volume
          <RemoteButton>
            <Glyphicon glyph="volume-off" />
          </RemoteButton>
          <RemoteButton>
            <Glyphicon glyph="volume-up" />
          </RemoteButton>
          <RemoteButton>
            <Glyphicon glyph="volume-down" />
          </RemoteButton>
        </ButtonGroup>
        <ButtonGroup vertical>
          Center Channel
          <RemoteButton>
            <Glyphicon glyph="volume-up" />
          </RemoteButton>
          <RemoteButton>
            <Glyphicon glyph="volume-down" />
          </RemoteButton>
        </ButtonGroup>
        <ButtonGroup vertical>
          Surround Mode
          <RemoteButton>Auto</RemoteButton>
          <RemoteButton>Movie</RemoteButton>
          <RemoteButton>Music</RemoteButton>
        </ButtonGroup>
      </>
    );
  }
}
