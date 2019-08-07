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

const Tablet = lazy(() =>
  import("./Tablet/MainScreen" /* webpackChunkName: "tablet", webpackPreload: true  */)
);

const App = () => {
  return (
    <Suspense fallback={<div className="loader" />}>
      <Router>
        <MqttProvider>
          <ConfigProvider>
            <Tablet />
          </ConfigProvider>
        </MqttProvider>
      </Router>
    </Suspense>
  );
};

export default App;
