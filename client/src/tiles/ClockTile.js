import React, { Component } from "react";
import Config from "Config.js";

import Tile from "components/Tile";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export default class ClockTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ""
    };
  }
  render() {
    const tileSize = Config.screenSize === "small" ? 1 : 2,
      state = this.state;

    return (
      <Tile width={2} height={2} readOnly>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 37 * tileSize, width: "100%" }}>
            {this.state.time}
            <span style={{ fontSize: 20 * tileSize }}>{state.seconds}</span>
          </div>
          <div style={{ fontSize: 20 }}>{state.day}</div>
          <div style={{ fontSize: 20 }}>{state.date}</div>
          <div style={{ fontSize: 8 }}>
            {window.innerWidth} x {window.innerHeight}
          </div>
        </div>
      </Tile>
    );
  }

  updateTime() {
    const d = new Date(),
      hr = d.getHours(),
      hour = hr > 12 ? hr - 12 : hr,
      min = String(d.getMinutes()),
      minutes = min.length === 1 ? "0" + min : min,
      sec = String(d.getSeconds()),
      seconds = sec.length === 1 ? "0" + sec : sec;

    this.setState({
      time: (hour || "12") + ":" + minutes,
      seconds: seconds,
      date: d.toLocaleDateString(),
      day: dayNames[d.getDay()]
    });
  }
  componentDidMount() {
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.fetcher) {
      clearInterval(this.fetcher);
      this.fetcher = null;
    }
  }
}
