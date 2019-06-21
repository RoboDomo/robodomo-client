import MQTT from "@/lib/MQTT";

export default (state, action) => {
  console.log("state", state, "action", action);
  const { type } = action,
    // state.device can be a string/name of device or a device object with device (name) field
    device = state.device.device || state.device;

  const topic = `denon/${device}/status/`,
    set_topic = topic.replace("status", "set") + "command";

  const actions = {
      masterup: "MVUP",
      masterdown: "MVDOWN",
      centerup: "CVC UP",
      centerdown: "CVC DOWN",
      auto: "MSAUTO",
      movie: "MSMOVIE",
      music: "MSMUSIC",
      poweron: "PWON",
      poweroff: "PWSTANDBY",
      standby: "PWSTANDBY",
      menuon: "MNMEN ON",
      menuoff: "MNMEN OFF",
      up: "MNCUP",
      down: "MNCDN",
      left: "MNCLT",
      right: "MNCRT",
      enter: "MNENT",
      return: "MNRTN",
      tv: "SITV",
      dvd: "SIDVD",
      blueray: "SIBD",
      satcbl: "SISAT/CBL",
      mplayer: "SIMPLAY",
      mute: "MUON",
      unmute: "MUOFF",
    },
    act = type.toLowerCase();

  const message = actions[act];
  if (message) {
    MQTT.publish(set_topic, message);
  } else {
    console.error("invalid command", act);
  }
  return state;
};
