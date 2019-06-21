import MQTT from "@/lib/MQTT";

export default (state, action) => {
  const { type, value } = action,
    autelis = state.autelis,
    forward = autelis.deviceMap.forward;

  const key = forward[type] || type;
  const status_topic = `autelis/status/`,
    set_topic = status_topic.replace("status", "set"); //  + "command/";

  if (typeof value !== "number") {
    MQTT.publish(set_topic + key, value ? "on" : "off");
  } else {
    MQTT.publish(set_topic + key, value);
  }
  return state;
};
