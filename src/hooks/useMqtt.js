import { useContext } from "react";
import { MqttContext } from "@/providers/mqtt";

/**
 * Usage:
 *    useMqtt({ mqtt, status });
 */
const useMqtt = () => {
  return useContext(MqttContext);
};

export default useMqtt;
