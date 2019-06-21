import MQTT from "@/lib/MQTT";

const actions = {
  play: "Play",
  pause: "Pause",
  backward: "SkipBackward",
  prev: "SkipBackward",
  previous: "SkipBackward",
  rewind: "BeginRewind",
  fastforward: "BeingForward",
  forward: "SkipForward",
  next: "SkipForward",
  stop: "Stop",
  menu: "Menu",
  suspend: "Suspend",
  home: "Suspend",
  power: "Power",
  up: "Up",
  joystickup: "Up",
  down: "Down",
  joystickdown: "Down",
  left: "Left",
  joystickleft: "Left",
  right: "Right",
  joystickright: "Right",
  select: "Select",
  enter: "Select",
};

export default (state, action) => {
  const type = action.type.toLowerCase(),
    command = actions[type];
  //
  if (command) {
    const topic = "appletv/" + state.device + "/status",
      set_topic = topic.replace("status", "set/command");
    MQTT.publish(set_topic, command);
  } else {
    console.error("appleTVReducer: Invalid command", action.type);
  }
  return state;
};
