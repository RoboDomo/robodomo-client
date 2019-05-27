import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

// import MQTT from 'lib/MQTT';

import Config from "./Config";

/* prettier-ignore */
console.log(
  "platform",
  Config.bowser,
  Config.bowser.platform.type,
  window.innerWidth,
  window.innerHeight
);

const mobile = Config.bowser.platform.type === "mobile",
  meta = document.getElementById("meta-viewport");
if (!mobile && meta && Config.bowser.platform.model !== "iPad") {
  //    width = 1024, // mobile ? window.outerWidth : 1024,
  //    height = 768; // mobile ? window.outerHeight : 768;
  // max scale tweaked so it looks good on a Galaxy Tab 7
  meta.setAttribute("content", "maximum-scale=0.90");
  //  meta.setAttribute("content", "width=" + width * 0.9);
  //  meta.setAttribute("content", "height=" + height * 0.6);
  //  console.log("width, height", width, height);
}
//outer.style.width = "100%";
//outer.style.height = "100%";
//meta.setAttribute("content", "height=" + window.innerHeight);

// MQTT.once('connect', () => {
import("./App" /* webpackChunkName: "reel", webpackPreload: true */)
  .then(mod => mod.default)
  .then(App => {
    ReactDOM.render(<App />, document.getElementById("root"));
  });
// });
// MQTT.connect();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// uncomment this for production:
serviceWorker.unregister();
