import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import MQTT from "lib/MQTT";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/slate/bootstrap.min.css";

import Config from "Config";

console.log("platform", Config.bowser);
//const mobile = Config.bowser.platform.type === "mobile";
//if (!mobile) {
//  const meta = document.getElementById("meta-viewport"),
//    width = mobile ? window.outerWidth : 1024,
//    height = mobile ? window.outerHeight : 768;
//  meta.setAttribute("content", "maximum-scale=0.5");
//  meta.setAttribute("content", "width=" + width);
//  meta.setAttribute("content", "height=" + height);
//  console.log("width, height", width, height);
//}
//outer.style.width = "100%";
//outer.style.height = "100%";
//meta.setAttribute("content", "height=" + window.innerHeight);

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
