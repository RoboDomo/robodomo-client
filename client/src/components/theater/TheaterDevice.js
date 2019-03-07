import React from "react";

import HarmonyRemoteControl from "components/theater/HarmonyRemoteControl";
import TiVoControl from "components/theater/TiVoControl";
import AppleTVControl from "components/theater/AppleTVControl";
import LGTVControl from "components/theater/LGTVControl";

export default ({ currentDevice, deviceMap, lgtv }) => {
  if (!currentDevice) {
    return <h1>All Off</h1>;
  }
  //    console.log("currentDevice", currentDevice);
  switch (currentDevice) {
    case "Harmony Hub":
      return <HarmonyRemoteControl hub={deviceMap.harmony} />;
    case "TiVo":
      return <TiVoControl device={deviceMap.tivo.device} />;
    case "Apple TV":
      return <AppleTVControl device={deviceMap.appletv.device} />;
    case "LG TV":
      return <LGTVControl lgtv={lgtv} />;
    default:
      return <h1>All Off</h1>;
  }
};
