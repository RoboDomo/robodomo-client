import React, { Component } from "react";

//import Config from "Config";

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Badge
} from "react-bootstrap";

import RemoteButton from "components/common/RemoteButton";
import FanButton from "components/common/FanButton";
import DimmerButton from "components/common/DimmerButton";
import MQTTButton from "components/common/MQTTButton";
import ThermostatButton from "components/common/ThermostatButton";
import TiVoControl from "components/theater/TiVoControl";
import AppleTVControl from "components/theater/AppleTVControl";
import AudioControl from "components/theater/AudioControl";
import LGTVControl from "components/theater/LGTVControl";

import MQTT from "lib/MQTT";

export default class TheaterTab extends Component {
  constructor(props) {
    super(props);
    const theater = (this.theater = this.props.theater);
    console.log("TheaterTab", theater);
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

    //    console.log("activities", this.activities);
    let storedState;
    try {
      storedState = JSON.parse(localStorage.getItem(this.storageKey));
      //      console.log("localStorage", storedState);
    } catch (e) {
      console.log("exception", e);
      storedState = {
        activeDevice: this.devices[0].device,
        activeActivity: this.activities[this.activities.length - 1].name
      };
      localStorage.setItem(this.storageKey, JSON.stringify(storedState));
    }
    this.state = {
      activeDevice: storedState.activeDevice,
      activeActivity: storedState.activeActivity
    };
    this.state = storedState;

    this.onMessage = this.onMessage.bind(this);
  }

  handleClickActivity(activity) {
    const newState = Object.apply({}, this.state || {});
    newState.activeActivity = activity.name;
    newState.activeDevice = activity.defaultDevice;
    localStorage.setItem(this.storageKey, JSON.stringify(newState));
    this.setState(newState);
    console.log("start activity", this.activitiesMap[activity], newState);
  }

  renderActivities() {
    const activities = this.activities;

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
                this.handleClickActivity(activity);
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

  handleClickDevice(device) {
    console.log("handleClickDevice", device, this.theater.title);

    const newState = Object.apply({}, this.state);
    newState.activeDevice = device.name;
    localStorage.setItem(this.storageKey, JSON.stringify(newState));
    this.setState(newState);

    console.log("select device", device, newState);
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
          let deviceName = device.name;
          if (
            deviceName === "LG TV" &&
            this.state.lgtv &&
            this.state.lgtv.indexOf("hdmi") !== -1
          ) {
            deviceName = (
              <>
                {deviceName}
                <Badge pullRight>{this.state.lgtv.toUpperCase()}</Badge>
              </>
            );
          } else if (deviceName === "Denon AVR" && this.state.denon) {
            deviceName = (
              <>
                {deviceName}
                <Badge pullRight>{this.state.denon.toUpperCase()}</Badge>
              </>
            );
          }
          return (
            <ListGroupItem
              as="button"
              active={activeDevice === device.name}
              onClick={() => {
                this.handleClickDevice(device);
              }}
              key={device.name}
            >
              {deviceName}
            </ListGroupItem>
          );
        })}
      </>
    );
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
              case "label":
                return <div key={key++}>{button.text}</div>;
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
                    <MQTTButton name={button.name} device={button.device}>
                      <span>{button.name}</span>
                    </MQTTButton>
                  </div>
                );
              case "fan":
                return (
                  <div key={key++}>
                    <FanButton name={button.device} />
                  </div>
                );
              case "dimmer":
                return (
                  <div key={key++}>
                    <DimmerButton name={button.device} />
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
    if (!this.state) {
      return <h1>All Off"</h1>;
    }
    console.log("activeDevice", this.state.activeDevice);
    switch (this.state.activeDevice) {
      case "TiVo":
        return <TiVoControl device={this.deviceMap.tivo.device} />;
      case "Apple TV":
        return <AppleTVControl device={this.deviceMap.appletv.device} />;
      case "LG TV":
        const lgtv = Object.assign({}, this.deviceMap.lgtv);
        lgtv.foregroundApp = this.state.foregroundApp;
        lgtv.launchPoints = this.state.launchPoints;
        lgtv.power = this.state.power;
        return <LGTVControl lgtv={lgtv} />;
      default:
        return <h1>All Off</h1>;
    }
  }

  determineCurrentActivity() {
    const state = this.state,
      newState = Object.assign({}, state || {});
    if (!state || state.power !== "on") {
      newState.activeActivity = "All Off";
      localStorage.setItem(this.storageKey, JSON.stringify(newState));
      this.setState(newState);
      return;
    }
    for (const activity of this.theater.activities) {
      const inputs = activity.inputs;
      if (!inputs) {
        continue;
      }

      let found = true;
      for (const input in inputs) {
        if (inputs[input] !== state[input]) {
          found = false;
        }
      }
      if (found) {
        // found current activity
        if (newState.activeActivity !== activity.name) {
          newState.activeDevice = activity.defaultDevice;
        }
        newState.activeActivity = activity.name;
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
        this.setState(newState);
      }
    }
  }

  render() {
    return (
      <Row style={{ marginTop: 20 }}>
        <Col sm={2}>
          <ListGroup>
            <h5 style={{ marginTop: 0 }}>Activities</h5>
            {this.renderActivities()}
            <h5 style={{ marginTop: 12 }}>Devices</h5>
            {this.renderDevices()}
          </ListGroup>
        </Col>
        <Col sm={10}>
          <Row>
            <Col sm={2} style={{ textAlign: "center" }}>
              <AudioControl />
            </Col>
            <Col sm={7} style={{ textAlign: "center" }}>
              {this.renderDevice()}
            </Col>
            <Col sm={3} style={{ textAlign: "center" }}>
              {this.renderButtons()}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  onMessage(topic, message) {
    const newState = Object.assign({}, this.state);
    if (topic.indexOf("power") !== -1) {
      newState.power = message;
    } else if (topic.indexOf("foreground") !== -1) {
      newState.foregroundApp = message;
    } else if (topic.indexOf("launchPoints") !== -1) {
      newState.launchPoints = message;
    } else if (topic.indexOf("SI") !== -1) {
      newState.denon = message;
    }
    const launchPoints = this.state.launchPoints,
      foregroundApp = this.state.foregroundApp;
    if (launchPoints && foregroundApp && foregroundApp.appId.length) {
      console.log(foregroundApp);
      newState.lgtv = (launchPoints[foregroundApp.appId].title || "unknown")
        .replace(/\s+/, "")
        .toLowerCase();
    }
    this.setState(newState);
    this.determineCurrentActivity();
  }

  componentDidMount() {
    //    console.log("componentDidMount");
    for (const device of this.devices) {
      //          console.log("key", key, device);
      switch (device.type) {
        case "lgtv":
          MQTT.subscribe(`lgtv/${device.device}/status/power`, this.onMessage);
          MQTT.subscribe(
            `lgtv/${device.device}/status/foregroundApp`,
            this.onMessage
          );
          MQTT.subscribe(
            `lgtv/${device.device}/status/launchPoints`,
            this.onMessage
          );
          break;
        case "denon":
          //          console.log("DENON", device.device);
          MQTT.subscribe(`denon/${device.device}/status/SI`, this.onMessage);
          break;
        default:
          //          console.log("unknown device type", device);
          break;
      }
    }
  }

  componentWillUnmount() {
    for (const device of this.devices) {
      switch (device.type) {
        case "lgtv":
          MQTT.unsubscribe(
            `lgtv/${device.device}/status/launchPoints`,
            this.onMessage
          );
          MQTT.unsubscribe(
            `lgtv/${device.device}/status/foregroundApp`,
            this.onMessage
          );
          MQTT.unsubscribe(
            `lgtv/${device.device}/status/power`,
            this.onMessage
          );
          break;
        case "denon":
          //          console.log("DENON", device.device);
          MQTT.unsubscribe(`denon/${device.device}/status/SI`, this.onMessage);
          break;
        default:
          break;
      }
    }
  }
}
