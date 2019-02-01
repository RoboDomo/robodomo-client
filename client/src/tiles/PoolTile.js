import React, { Component } from "react";

import Config from "Config";
import Tile from "components/Tile";
import MQTT from "lib/MQTT";

const topics = [
  "pump",
  "cleaner",
  "poolTemp",
  "poolHeat",
  "poolSetpoint",
  "solarHeat",
  "solarTemp"
];

export default class PoolTile extends Component {
  constructor(props) {
    super(props);

    this.controller = Config.autelis;
    this.deviceMap = this.controller.deviceMap;
    this.status_topic = Config.mqtt.autelis + "/status/";
    this.status_topic_length = this.status_topic.length;
    this.onStateChange = this.onStateChange.bind(this);
  }

  render() {
    try {
      if (!this.state) {
        return null;
      }

      const tileSize = Config.screenSize === "small" ? 1 : 2,
        state = this.state;

      function renderControl(ndx, text, big) {
        const thingState = (state[ndx] || "off").toLowerCase();

        if (thingState === "off") {
          return null;
        }
        if (big) {
          return <div style={{ fontSize: 30 }}>{text}</div>;
        }

        return <div>{text}</div>;
      }

      const on = state.pump.toLowerCase() === "on",
        backgroundColor = on
          ? state.poolHeat === "enabled"
            ? "red"
            : "green"
          : undefined,
        color = on ? "white" : undefined;

      function renderPool() {
        if (on) {
          return (
            <div>
              {renderControl("pump", `Pool ${state.poolTemp}°F`, true)}
              {renderControl("pump", "Filter On")}
              {renderControl("cleaner", "Cleaner On")}
              {renderControl("waterfall", "Waterfall On")}
              {renderControl("poolHeat", "Pool Heat " + state.poolSetpoint)}
              {renderControl(
                "solarHeat",
                "Solar Heat " +
                  (state.solarHeat === "enabled" || state.solarHeat === "on"
                    ? state.solarTemp
                    : "off")
              )}
            </div>
          );
        } else {
          return (
            <div>
              <div style={{ fontSize: 30 * tileSize }}>{"Pool Off"}</div>
            </div>
          );
        }
      }

      return (
        <Tile
          backgroundColor={backgroundColor}
          color={color}
          width={tileSize}
          height={1}
          onClick={() => {
            localStorage.setItem("autelis-radio", "pool");
            window.location.hash = "poolcontrol";
          }}
        >
          <div style={{ textAlign: "center" }}>{renderPool()}</div>
        </Tile>
      );
    } catch (e) {
      return null;
    }
  }

  onStateChange(topic, newState) {
    const newValue = {},
      what = topic.substr(this.status_topic_length),
      key = this.deviceMap.backward[what] || what;

    newValue[key] = newState;
    this.setState(newValue);
  }

  componentDidMount() {
    const status_topic = this.status_topic,
      deviceMap = this.deviceMap.forward;

    topics.forEach(topic => {
      const device = deviceMap[topic] || topic;
      MQTT.subscribe(status_topic + device, this.onStateChange);
    });
  }

  componentWillUnmount() {
    const status_topic = Config.mqtt.autelis + "/status/",
      deviceMap = this.deviceMap.forward;

    topics.forEach(topic => {
      const device = deviceMap[topic] || topic;
      MQTT.unsubscribe(status_topic + device, this.onStateChange);
    });
  }
}
