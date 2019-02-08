import React, { Component } from "react";

//import Config from "Config";

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ButtonGroup
} from "react-bootstrap";

import RemoteButton from "components/common/RemoteButton";
import ThermostatButton from "components/common/ThermostatButton";
import TiVoControl from "components/theater/TiVoControl";
import DenonControl from "components/theater/DenonControl";

export default class TheaterTab extends Component {
  constructor(props) {
    super(props);
    const theater = (this.theater = this.props.theater);
    this.storageKey = "theater-" + theater.title;

    this.devices = theater.devices || [];
    this.deviceMap = {};
    for (const device of this.devices) {
      this.deviceMap[device.type] = device;
    }
    this.handleClickDevice = this.handleClickDevice.bind(this);

    this.activities = theater.activities || [];
    this.activitiesMap = {};
    for (const activity of this.activities) {
      this.activitiesMap[activity.name] = activity;
    }
    this.handleClickActivity = this.handleClickActivity.bind(this);

    console.log("activities", this.activities);
    const defaultActivity = this.activities[this.activities.length - 1],
      defaultDevice = this.devices[0];
    this.state = {
      activeDevice: defaultDevice.device,
      activeActivity: defaultActivity.name
    };
    let storedState;
    try {
      storedState = JSON.parse(localStorage.getItem(this.storageKey));
    } catch (e) {
      storedState = {
        activeDevice: this.devices[0].device,
        activeActivity: this.activities[this.activities.length - 1].name
      };
      localStorage.setItem(this.storageKey, storedState);
    }
    console.log("storedState", storedState);
    this.state = storedState;
  }

  handleClickDevice(device) {
    console.log("handleClickDevice", device, this.theater.title);

    const newState = Object.apply({}, this.state);
    newState.activeDevice = device;
    this.setState(newState);

    localStorage.setItem(this.storageKey, newState);
  }

  renderDevices() {
    const devices = this.devices;
    if (!devices.length) {
      return null;
    }

    const activeDevice = this.state.activeDevice;
    return (
      <>
        {devices.map(device => {
          if (this.state.activeDevice === device.device) {
            console.log("ACTIVE", activeDevice);
          }
          return (
            <ListGroupItem
              as="button"
              active={activeDevice === device.device}
              onClick={() => {
                this.handleClickDevice(device.device);
              }}
              key={device.name}
            >
              {device.name}
            </ListGroupItem>
          );
        })}
      </>
    );
  }

  handleClickActivity(activity) {
    console.log("handleClickActivity", activity, this.theater.title);

    const newState = Object.apply({}, this.state);
    newState.activeActivity = activity;
    this.setState(newState);
    localStorage.setItem(this.storageKey, newState);
  }

  renderActivities() {
    const activities = this.activities;

    console.log("activities", activities);
    if (!activities.length) {
      return null;
    }

    return (
      <>
        {activities.map(activity => {
          return (
            <ListGroupItem
              active={this.state.activeActivity === activity.name}
              onClick={() => {
                this.handleClickActivity(activity.name);
              }}
              key={activity.name}
            >
              {activity.name}
            </ListGroupItem>
          );
        })}
      </>
    );
  }

  renderVolume() {
    return <DenonControl />;
  }

  renderTivo() {
    return (
      <Row>
        <Col sm={2} style={{ textAlign: "center" }}>
          {this.renderVolume()}
        </Col>
        <Col sm={7} style={{ textAlign: "center" }}>
          <TiVoControl device={this.deviceMap.tivo.device} />
        </Col>
        <Col sm={3} style={{ textAlign: "center" }}>
          {this.renderButtons()}
        </Col>
      </Row>
    );
    //        <div style={{ float: "left", width: 160 }}>{this.renderVolume()}</div>
    //        <div style={{ textAlign: "center", float: "left" }}>
    //          <TiVoControl device={this.deviceMap.tivo.device} />
    //        </div>
    //        <div style={{ float: "right", width: 160 }}>{this.renderButtons()}</div>
  }

  renderButtons() {
    if (!this.theater.buttons) {
      return null;
    }
    let key = 0;
    return (
      <div style={{ textAlign: "center" }}>
        <ButtonGroup vertical>
          {this.theater.buttons.map(button => {
            switch (button.type) {
              case "thermostat":
                return (
                  <div key={key++} style={{ marginBottom: 8 }}>
                    <ThermostatButton
                      thermostat={button.device}
                      weather={button.weather}
                    />
                  </div>
                );
              case "macro":
                return (
                  <div key={key++}>
                    <RemoteButton>
                      <span>{button.name}</span>
                    </RemoteButton>
                  </div>
                );
              default:
                return (
                  <div key={key++}>
                    <RemoteButton>
                      <span>{button.name}</span>
                    </RemoteButton>
                  </div>
                );
            }
          })}
        </ButtonGroup>
      </div>
    );
  }
  renderDevice() {
    return <>{this.renderTivo()}</>;
  }

  render() {
    return (
      <Row style={{ marginTop: 20 }}>
        <Col sm={2}>
          <ListGroup>
            <div style={{ marginTop: 0 }}>Activities</div>
            {this.renderActivities()}
            <div style={{ marginTop: 12 }}>Devices</div>
            {this.renderDevices()}
          </ListGroup>
        </Col>
        <Col sm={10}>{this.renderDevice()}</Col>
      </Row>
    );
  }
}
