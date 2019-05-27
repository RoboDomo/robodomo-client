import React, { Suspense, lazy } from "react";
import Config from "./Config";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";

const Tablet = lazy(() =>
  import("./Tablet/MainScreen" /* webpackChunkName: "tablet", webpackPrefetch: true  */)
);
const Phone = lazy(() =>
  import("./Phone/MainScreen" /* webpackChunkName: "phone", webpackPrefetch: true  */)
);

const Platform = () => {
  if (Config.bowser.platform.type === "mobile") {
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

const App = () => (
  <Suspense fallback={<div className="loader" />}>
    <Platform />
  </Suspense>
);

export default App;
