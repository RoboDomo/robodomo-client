import React from "react";
import useConfig from "@/common/hooks/useConfig";

import { Image, ButtonGroup, Tooltip, OverlayTrigger } from "react-bootstrap";

import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaForward,
  FaFastForward,
  FaDotCircle,
} from "react-icons/fa";

import ActionButton from "@/common/ActionButton";

import useLGTV from "@/common/hooks/useLGTV";

import MQTT from "@/lib/MQTT";

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
  "LG Remote Service",
];

// If props.lgtv.tuner is set to true, then additional controls are rendered.
// Number pad, for example, is not needed for smart TV apps, but are needed
// for watching TV.
const LGTVControl = ({ config }) => {
  const Config = useConfig();

  const lgtv = useLGTV(config),
    tvInput = lgtv.input,
    dispatch = lgtv.dispatch;

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
        <div style={{ marginTop: 4 }}>
          <ButtonGroup>
            <ActionButton>Netflix</ActionButton>
            <ActionButton>Prime</ActionButton>
            <ActionButton>YouTube</ActionButton>
            <ActionButton>CBS</ActionButton>
          </ButtonGroup>
        </div>
      );
    }

    return (
      <>
        {Object.keys(lgtv.launchPoints).map(key => {
          const info = lgtv.launchPoints[key];
          //          console.log("key", key, "info", info)
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
          const appId = foregroundApp.appId,
            app = launchPoints[appId];
          const border = app === info ? "6px inset white" : "6px outset white";
          //          console.log("foregroundApp", foregroundApp.appId, info);
          return (
            <div
              style={{
                marginRight: 10,
                marginBottom: 10,
                float: "left",
                border: border,
              }}
              key={info.id}
              onClick={() => {
                console.log("click", info);
                MQTT.publish(`${set_topic}`, `LAUNCH-${info.id}`);
              }}
            >
              <OverlayTrigger key={okey} overlay={overlay}>
                <Image
                  fluid
                  alt={info.title}
                  style={{ maxWidth: 40, minHeight: 40 }}
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
    if (true || !foregroundApp || !launchPoints) {
      return null;
    }

    const appId = foregroundApp.appId,
      app = launchPoints[appId];

    if (!app) {
      return null;
    }
    console.log("app.icon", app.icon, app.title);
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginLeft: "auto", marginRight: "auto", width: 100 }}>
          <img alt={app.icon} src={app.icon} />
          {app.title}
        </div>
      </div>
    );
  };

  const renderHDMI = () => {
    const button = n => {
      const hdmi = "hdmi" + n;
      return (
        <ActionButton
          dispatch={dispatch}
          action={hdmi}
          variant={tvInput === hdmi ? "success" : undefined}
        >
          HDMI {n}
        </ActionButton>
      );
    };
    return (
      <ButtonGroup>
        {button(1)}
        {button(2)}
        {button(3)}
        {button(4)}
      </ButtonGroup>
    );
  };

  const renderControlButtons = () => {
    return (
      <div style={{ marginTop: 4 }}>
        <ActionButton dispatch={dispatch} action="back">
          Back
        </ActionButton>
        <ActionButton dispatch={dispatch} action="menu">
          Menu
        </ActionButton>
        <ActionButton dispatch={dispatch} action="home">
          Home
        </ActionButton>
        <ActionButton dispatch={dispatch} action="guide">
          Guide
        </ActionButton>
      </div>
    );
  };

  const renderJoystick = () => {
    const button = (action, label, variant) => {
      return (
        <ActionButton variant={variant} dispatch={dispatch} action={action}>
          {label}
        </ActionButton>
      );
    };

    return (
      <>
        <ButtonGroup>
          <ActionButton variant="none" />
          {button("up", <FaChevronUp />)};{button("channelup", "+", "info")};
        </ButtonGroup>
        <br />
        <ButtonGroup>
          {button("left", <FaChevronLeft />)};{button("select", "Select")};
          {button("right", <FaChevronRight />)};
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton variant="none" />
          {button("down", <FaChevronDown />)};{button("channeldown", "-", "info")};
        </ButtonGroup>
      </>
    );
  };

  const renderKeypad = () => {
    //    if (!lgtv.tuner) {
    //      return null;
    //    }
    const button = n => {
      let label = "" + n;
      if (n === "clear") {
        label = ".";
      } else if (n === "enter") {
        label = "Enter";
      }
      return (
        <ActionButton dispatch={dispatch} action={"" + n}>
          {label}
        </ActionButton>
      );
    };
    return (
      <>
        <div style={{ marginTop: 4 }}>
          <ButtonGroup>
            {button(1)}
            {button(2)}
            {button(3)}
          </ButtonGroup>
          <br />
          <ButtonGroup>
            {button(4)}
            {button(5)}
            {button(6)}
          </ButtonGroup>
          <br />
          <ButtonGroup>
            {button(7)}
            {button(8)}
            {button(9)}
          </ButtonGroup>
          <br />
          <ButtonGroup>
            {button("clear")}
            {button(0)}
            {button("enter")}
          </ButtonGroup>
        </div>
      </>
    );
  };

  const renderTransport = () => {
    const button = (action, label, variant) => {
      return (
        <ActionButton variant={variant} dispatch={dispatch} action={action} mini>
          {label}
        </ActionButton>
      );
    };
    return (
      <ButtonGroup>
        {button("replay", <FaFastBackward />)}
        {button("reverse", <FaBackward />)}
        {button("pause", <FaPause />)}
        {button("play", <FaPlay />)}
        {button("slow", <FaStepForward />)}
        {button("forward", <FaForward />)}
        {button("advance", <FaFastForward />)}
        {button("record", <FaDotCircle />, "danger")}
      </ButtonGroup>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 48 * 10 }}>{renderLaunchPoints()}</div>
      <div>{renderNowPlaying()}</div>
      <div style={{ marginTop: 4 }}>{renderHDMI()}</div>
      <div style={{ marginTop: 4 }}>{renderControlButtons()}</div>
      <div style={{ margin: 10 }}>{renderJoystick()}</div>
      <div>{renderKeypad()}</div>
      <div style={{ marginTop: 4 }}> {renderTransport()} </div>
    </div>
  );
};

//
export default LGTVControl;
