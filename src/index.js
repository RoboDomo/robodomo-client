import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "@/serviceWorker";

// We only need to calculate platform once.
import bowser from "bowser";
const parser = bowser.getParser(window.navigator.userAgent),
  platform = parser.getResult().platform;

const mobile = platform.type === "mobile",
  meta = document.getElementById("meta-viewport");

if (!mobile && meta && platform.model !== "iPad") {
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
