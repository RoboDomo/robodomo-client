import { useEffect, useState } from "react";

import MQTT from "@/lib/MQTT";
import useConfig from "@/hooks/useConfig";

const thermostatTopics = [
  "device",
  "name",
  "structure_name",
  "postal_code",
  "away",
  "ambient_temperature_f",
  "target_temperature_f",
  "hvac_state",
  "has_leaf",
  "humidity",
  "time_to_target",
  "hvac_mode",
];

const useThermostat = device => {
  const Config = useConfig();
  const [thermoState, setThermoState] = useState(null);
  //
  useEffect(() => {
    if (device === undefined) {
      return;
    }
    const thermostat_status_topic = Config.mqtt.nest + "/" + device + "/status/";

    const onThermostatChange = (topic, newState) => {
      const thermostat_status_topic_length = thermostat_status_topic.length;
      const key = topic.substr(thermostat_status_topic_length);
      const s = {};
      s[key] = newState;
      setThermoState(prev => ({ ...prev, ...s }));
    };

    for (const topic of thermostatTopics) {
      MQTT.subscribe(thermostat_status_topic + topic, onThermostatChange);
    }

    return () => {
      for (const topic of thermostatTopics) {
        MQTT.unsubscribe(thermostat_status_topic + topic, onThermostatChange);
      }
    };
  }, [Config.mqtt.nest, device]);

  if (thermoState) {
    thermoState.device = device;
  }
  return thermoState;
};

//
export default useThermostat;
