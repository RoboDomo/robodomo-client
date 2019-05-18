import React from "react";

import HarmonyRemoteControl from "./HarmonyRemoteControl";
import TiVoControl from "./TiVoControl";
import AppleTVControl from "./AppleTVControl";
import LGTVControl from "./LGTVControl";
import BraviaControl from "./BraviaControl";

const TheaterDevice = ({ currentDevice, avr, tv, deviceMap }) => {
  if (!currentDevice) {
    return <h1>All Off</h1>;
  }
  //  console.log("currentDevice", currentDevice);

  if (currentDevice.startsWith("Sony")) {
    currentDevice = "Sony TV";
  }
  switch (currentDevice) {
    case "Harmony Hub":
      return <HarmonyRemoteControl hub={deviceMap.harmony} />;
    case "TiVo":
      return <TiVoControl device={deviceMap.tivo.device} />;
    case "Apple TV":
      return <AppleTVControl device={deviceMap.appletv.device} />;
    case "LG TV":
      // TODO tvInput, avrInput props might change?  Use key...
      return <LGTVControl config={deviceMap.lgtv} />;
    case "Sony TV":
      return (
        <BraviaControl
          bravia={deviceMap.bravia}
          tvInput={tv.input}
          avrInput={avr.input}
        />
      );
    default:
      return <h1>All Off</h1>;
  }
};
//
export default TheaterDevice;
