//import React, { useState, useEffect, useRef } from "react";

import MQTT from "@/lib/MQTT";

export default (state, action) => {
  const device = state.device;
  const type = action.type.toLowerCase(),
    command = action.command,
    command_topic = "harmony/" + device + "/set/device/";

  if (!command) {
    return state;
  }

  //  console.warn("activities", state.activities);
  switch (type) {
    case "send_key":
      MQTT.publish(command_topic + command.action.deviceId, command.name);
      break;
    //    case "start_activity":
    //      break;
    default:
      break;
  }

  //
  return state;
};
