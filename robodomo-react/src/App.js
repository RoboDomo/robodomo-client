import React from "react";

import Tablet from "Tablet/MainScreen";
import Phone from "Phone/MainScreen";
import Config from "Config";

const App = () => {
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
export default App;
