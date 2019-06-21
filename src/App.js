import React, { Suspense, useState, useEffect, lazy } from "react";
import ConfigurationContext from "@/hooks/contexts/ConfigurationContext";
import MqttProvider from "@/providers/mqtt";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";

import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "./theme.css";

import MQTT from "@/lib/MQTT";

// We only need to calculate platform once.
import bowser from "bowser";
const parser = bowser.getParser(window.navigator.userAgent),
  platform = parser.getResult().platform;

const Tablet = lazy(() =>
  import("./Tablet/MainScreen" /* webpackChunkName: "tablet", webpackPrefetch: true  */)
);
const Phone = lazy(() =>
  import("./Phone/MainScreen" /* webpackChunkName: "phone", webpackPrefetch: true  */)
);

const Platform = () => {
  if (platform.type === "mobile") {
    setTimeout(async () => {
      try {
        await window.screen.orientation.lock("natural");
      } catch (e) {
        console.error("failed to lock", e);
        console.dir(e);
      }
    }, 1);
    return <Phone />;
  }
  return <Tablet />;
};

const App = () => {
  const [config, setConfig] = useState(null);

  const handleSettings = (topic, message) => {
    setConfig(message);
  };

  useEffect(() => {
    MQTT.subscribe("settings/status/config", handleSettings);
  }, []);

  return (
    <Suspense fallback={<div className="loader" />}>
      <MqttProvider>
        <ConfigurationContext.Provider value={config}>
          <Platform />
        </ConfigurationContext.Provider>
      </MqttProvider>
    </Suspense>
  );
};

export default App;
