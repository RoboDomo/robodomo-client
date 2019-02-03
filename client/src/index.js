import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import MQTT from "lib/MQTT";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/slate/bootstrap.min.css";

const meta = document.getElementById("meta-viewport");
meta.setAttribute("content", "maximum-scale=0.5");
meta.setAttribute("content", "width=1024");
meta.setAttribute("content", "height=" + window.innerHeight);

MQTT.once("connect", () => {
  ReactDOM.render(
    <App style={{ height: "100%" }} />,
    document.getElementById("root")
  );
});
MQTT.connect();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
