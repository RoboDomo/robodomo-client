import React from "react";

import HarmonyRemoteControl from "./HarmonyRemoteControl";
import TiVoControl from "./TiVoControl";
import AppleTVControl from "./AppleTVControl";
import LGTVControl from "./LGTVControl";
import BraviaControl from "./BraviaControl";
import DenonControl from "./DenonControl";

const TheaterDevice = ({ currentDevice, deviceMap }) => {
  if (!currentDevice) {
    return <h1>All Off</h1>;
  }
  switch (currentDevice) {
    case "Harmony Hub":
      return <HarmonyRemoteControl hub={deviceMap.harmony} />;
    case "TiVo":
      return <TiVoControl config={deviceMap.tivo} />;
    case "AVR":
      return <DenonControl config={deviceMap.denon} />;
    case "Apple TV":
    case "AppleTV":
      return <AppleTVControl device={deviceMap.appletv.device} />;
    case "LG TV":
    case "TVLG":
      // TODO tvInput, avrInput props might change?  Use key...
      return <LGTVControl config={deviceMap.lgtv} />;
    case "TV":
    case "TVSONY":
      return <BraviaControl config={deviceMap.bravia} />;
    default:
      return <h1>All Off</h1>;
  }
};

//
export default TheaterDevice;
