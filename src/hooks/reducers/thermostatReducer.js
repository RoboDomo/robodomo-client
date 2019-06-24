import MQTT from "@/lib/MQTT";

export default (state, action) => {
  const device = state.device;
  const { type, value } = action;
  const thermostat_status_topic = "nest/" + device + "/status/",
    set_topic = thermostat_status_topic.replace("status", "set");

  switch (type.toLowerCase()) {
    case "hvac_mode":
      MQTT.publish(set_topic + "hvac_mode", value);
      break;
    case "target_temp":
    case "target_temperature":
      MQTT.publish(set_topic + "target_temperature_f", value);
      break;
    default:
      break;
  }

  //
  return state;
};
