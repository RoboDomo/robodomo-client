import MQTT from "@/lib/MQTT";

export default (state, action) => {
  const device = state.device;

  const topic = `tivo/${device}/status/`,
    set_topic = topic.replace("status", "set") + "command";

  const actions = {
      clear: "CLEAR",
      livetv: "LIVETV",
      tivo: "TIVO",
      guide: "GUIDE",
      info: "INFO",

      thumbsup: "THUMBSUP",
      back: "BACK",
      thumbsdown: "THUMBSDOWN",

      up: "UP",
      channelup: "CHANNELUP",
      left: "LEFT",
      select: "SELECT",
      right: "RIGHT",
      down: "DOWN",
      channeldown: "CHANNELDOWN",

      a: "a",
      b: "b",
      c: "c",
      d: "d",

      num1: "NUM1",
      num2: "NUM2",
      num3: "NUM3",
      num4: "NUM4",
      num5: "NUM5",
      num6: "NUM6",
      num7: "NUM7",
      num8: "NUM8",
      num9: "NUM9",
      num0: "NUM0",
      enter: "ENTER",

      replay: "REPLAY",
      reverse: "REVERSE",
      pause: "PAUSE",
      play: "PLAY",
      slow: "SLOW",
      forward: "FORWARD",
      advance: "ADVANCE",
      record: "RECORD",
    },
    act = action.type.toLowerCase(),
    message = actions[act];

  if (message) {
    MQTT.publish(set_topic, message);
  } else {
    console.error("invalid command", act);
  }

  //
  return state;
};
