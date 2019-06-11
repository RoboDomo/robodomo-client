import { useState, useEffect, useReducer } from "react";
import useConfig from "@/common/hooks/useConfig";
import MQTT from "@/lib/MQTT";

const useLGTV = config => {
  const Config = useConfig();
  const hostname = config.device;
  const [power, setPower] = useState(null);
  const [input, setInput] = useState(null);
  const [foregroundApp, setForegroundApp] = useState(null);
  const [launchPoints, setLaunchPoints] = useState(null);

  const status_topic = Config.mqtt.lgtv + "/" + hostname + "/status/",
    set_topic = status_topic.replace("status", "set") + "command";

  const reducer = (state, action) => {
    const topics = {
      poweron: "POWERON",
      poweroff: "POWEROFF",
      back: "KEY_BACK",
      menu: "KEY_MENU",
      home: "KEY_HOME",
      guide: "KEY_GUIDE",
      hdmi1: "LAUNCH-com.webos.app.hdmi1",
      hdmi2: "LAUNCH-com.webos.app.hdmi2",
      hdmi3: "LAUNCH-com.webos.app.hdmi3",
      hdmi4: "LAUNCH-com.webos.app.hdmi4",
      0: "KEY_NUM0",
      1: "KEY_NUM1",
      2: "KEY_NUM2",
      3: "KEY_NUM3",
      4: "KEY_NUM4",
      5: "KEY_NUM5",
      6: "KEY_NUM6",
      7: "KEY_NUM7",
      8: "KEY_NUM8",
      9: "KEY_NUM9",
      clear: "KEY_CLEAR",
      enter: "KEY_ENTER",
      up: "KEY_UP",
      down: "KEY_DOWN",
      left: "KEY_LEFT",
      right: "KEY_RIGHT",
      channelup: "KEY_CHANNELUP",
      channeldown: "KEY_CHANNELDOWN",
      select: "KEY_ENTER",
      //
      replay: "REPLAY",
      rewind: "REVERSE",
      pause: "PAUSE",
      play: "PLAY",
      slow: "SLOW",
      forward: "FORWARD",
      advance: "ADVANCE",
    };
    const topic = topics[("" + action.type).toLowerCase()];

    try {
      MQTT.publish(set_topic, topic);
      return [
        ...state,
        {
          /* newstate*/
        },
      ];
    } catch (e) {}
  };

  const handlePower = (topic, message) => {
    if (message === true || message === false) {
      setPower(message ? "on" : "off");
    } else {
      setPower(message === "on");
    }
  };

  const handleForegroundApp = (topic, message) => {
    setForegroundApp(message);
  };

  const handleLaunchPoints = (topic, message) => {
    try {
      setLaunchPoints(JSON.parse(message));
    } catch (e) {
      setLaunchPoints(message);
    }
  };

  useEffect(() => {
    MQTT.subscribe(`lgtv/${hostname}/status/power`, handlePower);
    MQTT.subscribe(`lgtv/${hostname}/status/launchPoints`, handleLaunchPoints);
    MQTT.subscribe(`lgtv/${hostname}/status/foregroundApp`, handleForegroundApp);
    return () => {
      MQTT.unsubscribe(`lgtv/${hostname}/status/power`, handlePower);
      MQTT.unsubscribe(`lgtv/${hostname}/status/launchPoints`, handleLaunchPoints);
      MQTT.unsubscribe(`lgtv/${hostname}/status/foregroundApp`, handleForegroundApp);
    };
  }, [hostname]);

  useEffect(() => {
    if (
      !launchPoints ||
      !foregroundApp ||
      !foregroundApp.appId ||
      !launchPoints[foregroundApp.appId]
    ) {
      setInput("OFF");
      return;
    }
    const title = launchPoints[foregroundApp.appId].title;
    const lp = title || "unknown";
    const inp = power ? lp.replace(/\s+/, "").toLowerCase() : "OFF";

    setInput(inp);
  }, [foregroundApp, launchPoints, power]);

  const [, d] = useReducer(reducer);
  return {
    ...config,
    //    reducer: r,
    dispatch: d,
    power: power,
    input: input,
    foregroundApp: foregroundApp,
    launchPoints: launchPoints,
  };
};

//
export default useLGTV;
