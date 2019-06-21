import MQTT from "@/lib/MQTT";

export default (state, action) => {
  const macro = action.action || action.macro;
  MQTT.publish("macros/run", macro);
};
