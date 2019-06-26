// @ts-check
import React, { useState, createContext, useEffect } from "react";
import useMqtt from "@/hooks/useMqtt";

const ConfigContext = createContext(null);

/**
 * @typedef {Function} ConfigProviderProps
 * @prop {children: import('react').ReactNode} props
 */

/**
 * @type ConfigProviderProps
 */
const ConfigProvider = props => {
  const [config, setConfig] = useState(null);
  const { mqtt } = useMqtt();

  /**
   * @param {string} topic
   * @param {Object} message
   */
  const handleSettings = (topic, message) => {
    setConfig(message);
  };

  useEffect(() => {
    if (process.env.REACT_APP_DEMO === "true") {
      // if DEMO env var is set then we want to load stub data
      import("@/dev/config" /* webpackChunkName: "demo-config" */).then(({ default: config }) => {
        setConfig(config);
      });
    } else {
      // subscribe to the config topic and store settings in
      mqtt.subscribe("settings/status/config", handleSettings);
    }
  }, [mqtt]);

  return <ConfigContext.Provider value={config}>{props.children}</ConfigContext.Provider>;
};

export default ConfigProvider;

export { ConfigContext };
