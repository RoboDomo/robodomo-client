import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "@/serviceWorker";

const App = lazy(() => import("./App" /* webpackChunkName: "robodomo", webpackPreload: true */));

ReactDOM.render(
  <Suspense fallback={<div className="loader" />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// uncomment this for production:
serviceWorker.register();
