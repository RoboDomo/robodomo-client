import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MqttProvider from "@/providers/mqtt";
import ConfigProvider from "@/providers/config";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";

import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "./theme.css";

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
  return (
    <Suspense fallback={<div className="loader" />}>
      <Router>
        <MqttProvider>
          <ConfigProvider>
            <Platform />
          </ConfigProvider>
        </MqttProvider>
      </Router>
    </Suspense>
  );
};

export default App;
