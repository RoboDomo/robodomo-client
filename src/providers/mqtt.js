// @ts-check
import React, { useState, createContext, useEffect } from "react";
import mqtt from "@/lib/MQTT";

/**
 * @typedef {Object} MqttContextType
 * @prop {mqtt} mqtt - MQTT instance
 * @prop {'offline' | 'connecting' | 'online' | 'error'} status - Connection status
 */

const MqttContext = createContext({
  mqtt,
  status: "offline",
});

/**
 * @typedef {Function} MqttProviderProps
 * @prop {children: import('react').ReactNode} props
 */

/**
 * @type MqttProviderProps
 */
const MqttProvider = props => {
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    mqtt.once("connect", () => {
      setStatus("online");
    });
    mqtt.on("failure", () => {
      setStatus("error");
    });

    mqtt.connect();
  }, []);

  const context = { mqtt, status };

  return <MqttContext.Provider value={context}>{props.children}</MqttContext.Provider>;
};

export default MqttProvider;

export { MqttContext };
