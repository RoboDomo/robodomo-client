import MQTT from "@/lib/MQTT";

export default (state, action) => {
  console.log("state", state, "action", action);
  const device = state.device,
    hostname = device;

  const status_topic = "lgtv/" + hostname + "/status/",
    set_topic = status_topic.replace("status", "set") + "command";

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
  const topic = topics[("" + action.type).toLowerCase()] || action.type;

  try {
    MQTT.publish(set_topic, topic);
  } catch (e) {}
  return state;
};
