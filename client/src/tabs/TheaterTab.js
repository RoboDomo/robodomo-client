import React, { Component } from "react";

import Config from "Config";

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  Glyphicon
} from "react-bootstrap";

import RemoteButton from "components/RemoteButton";

const style = {
  row: { marginTop: 4 }
};
export default class TheaterTab extends Component {
  constructor(props) {
    super(props);
    const theater = (this.theater = this.props.theater);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activeDevice:
        localStorage.getItem("theater-" + theater.title) || "theater"
    };
  }
  handleClick(device) {
    localStorage.setItem("theater-" + this.theater.title, device);
    this.setState({ activeDevice: device });
  }

  renderVolume() {
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

  renderTivo() {
    return (
      <>
        <div style={{ float: "left", width: 160 }}>{this.renderVolume()}</div>
        <div style={{ textAlign: "center", float: "left" }}>
          <Row>
            <ButtonGroup>
              <RemoteButton>Clear</RemoteButton>
              <RemoteButton>Live TV</RemoteButton>
              <RemoteButton bsStyle="primary">Tivo</RemoteButton>
              <RemoteButton>Guide</RemoteButton>
              <RemoteButton>Info</RemoteButton>
            </ButtonGroup>
          </Row>
          <Row style={style.row}>
            <ButtonGroup>
              <RemoteButton bsStyle="success">
                <Glyphicon glyph="thumbs-up" />
              </RemoteButton>
              <RemoteButton>Back</RemoteButton>
              <RemoteButton bsStyle="danger">
                <Glyphicon glyph="thumbs-down" />
              </RemoteButton>
            </ButtonGroup>
          </Row>
          <Row style={style.row}>
            <ButtonGroup>
              <RemoteButton bsStyle="none" />
              <RemoteButton>
                <Glyphicon glyph="chevron-up" />
              </RemoteButton>
              <RemoteButton bsStyle="info">+</RemoteButton>
            </ButtonGroup>
            <br />
            <ButtonGroup>
              <RemoteButton>
                <Glyphicon glyph="chevron-left" />
              </RemoteButton>
              <RemoteButton bsStyle="primary">Select</RemoteButton>
              <RemoteButton>
                <Glyphicon glyph="chevron-right" />
              </RemoteButton>
            </ButtonGroup>
            <br />
            <ButtonGroup>
              <RemoteButton bsStyle="none"> </RemoteButton>
              <RemoteButton>
                <Glyphicon glyph="chevron-down" />
              </RemoteButton>
              <RemoteButton bsStyle="info"> - </RemoteButton>
            </ButtonGroup>
          </Row>
          <Row style={style.row}>
            <ButtonGroup>
              <RemoteButton bsStyle="warning">A</RemoteButton>
              <RemoteButton bsStyle="primary">B</RemoteButton>
              <RemoteButton bsStyle="danger">C</RemoteButton>
              <RemoteButton bsStyle="success">D</RemoteButton>
            </ButtonGroup>
          </Row>
          <Row style={style.row}>
            <ButtonGroup>
              <RemoteButton>1</RemoteButton>
              <RemoteButton>2</RemoteButton>
              <RemoteButton>3</RemoteButton>
            </ButtonGroup>
            <br />
            <ButtonGroup>
              <RemoteButton>4</RemoteButton>
              <RemoteButton>5</RemoteButton>
              <RemoteButton>6</RemoteButton>
            </ButtonGroup>
            <br />
            <ButtonGroup>
              <RemoteButton>7</RemoteButton>
              <RemoteButton>8</RemoteButton>
              <RemoteButton>9</RemoteButton>
            </ButtonGroup>
            <br />
            <ButtonGroup>
              <RemoteButton>.</RemoteButton>
              <RemoteButton>0</RemoteButton>
              <RemoteButton>Enter</RemoteButton>
            </ButtonGroup>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <ButtonGroup>
              <RemoteButton mini>
                <Glyphicon glyph="fast-backward" />
              </RemoteButton>
              <RemoteButton mini>
                <Glyphicon glyph="backward" />
              </RemoteButton>
              <RemoteButton mini>
                <Glyphicon glyph="pause" />
              </RemoteButton>
              <RemoteButton mini>
                <Glyphicon glyph="play" />
              </RemoteButton>
              <RemoteButton mini>
                <Glyphicon glyph="step-forward" />
              </RemoteButton>
              <RemoteButton mini>
                <Glyphicon glyph="forward" />
              </RemoteButton>
              <RemoteButton mini>
                <Glyphicon glyph="fast-forward" />
              </RemoteButton>
              <RemoteButton mini bsStyle="danger">
                <Glyphicon glyph="record" />
              </RemoteButton>
            </ButtonGroup>
          </Row>
        </div>
        <div style={{ float: "right", width: 160 }}>{this.renderButtons()}</div>
      </>
    );
  }

  renderButtons() {
    let key = 0;
    return (
      <div style={{ width: 160, float: "right" }}>
        <ButtonGroup vertical>
          {this.theater.buttons.map(button => {
            switch (button.type) {
              case "thermostat":
                return (
                  <div key={key++} style={{ marginBottom: 8 }}>
                    <RemoteButton>
                      <Glyphicon glyph="chevron-up" />
                    </RemoteButton>
                    <div style={{ fontSize: 24, textAlign: "center" }}>
                      74&deg;F
                    </div>
                    <RemoteButton>
                      <Glyphicon glyph="chevron-down" />
                    </RemoteButton>
                  </div>
                );
              case "macro":
                return (
                  <div key={key++}>
                    <RemoteButton>
                      <span style={{ fontSize: 11 }}>{button.name}</span>
                    </RemoteButton>
                  </div>
                );
              default:
                return (
                  <RemoteButton key={key++}>
                    <span style={{ fontSize: 11 }}>{button.name}</span>
                  </RemoteButton>
                );
            }
            console.log("button", button);
          })}
        </ButtonGroup>
      </div>
    );
  }
  renderDevice() {
    return <>{this.renderTivo()}</>;
  }

  render() {
    const devices = this.theater.devices;
    return (
      <Row style={{ marginTop: 20 }}>
        <Col sm={2}>
          <ListGroup>
            <ListGroupItem
              active={this.state.activeDevice === "theater"}
              onClick={() => {
                this.handleClick("theater");
              }}
              key={"theater"}
            >
              Theater
            </ListGroupItem>
            {devices.map(device => {
              return (
                <ListGroupItem
                  active={this.state.activeDevice === device.device}
                  onClick={() => {
                    this.handleClick(device);
                  }}
                  key={device.name}
                >
                  {device.name}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
        <Col sm={10}>{this.renderDevice()}</Col>
      </Row>
    );
  }
}
