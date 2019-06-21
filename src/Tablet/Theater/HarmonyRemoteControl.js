import React, { useReducer } from "react";
import useHarmony from "@/hooks/useHarmony";
import harmonyReducer from "@/hooks/reducers/harmonyReducer";

import XBoxButtons from "@/common/harmony/XBoxButtons";
import RokuButtons from "@/common/harmony/RokuButtons";
import TiVoButtons from "@/common/harmony/TiVoButtons";
import AppleTVButtons from "@/common/harmony/AppleTVButtons";
import JoystickButtons from "@/common/harmony/JoystickButtons";
import ColoredButtons from "@/common/harmony/ColoredButtons";
import ABCDButtons from "@/common/harmony/ABCDButtons";
import NumberButtons from "@/common/harmony/NumberButtons";
import TransportButtons from "@/common/harmony/TransportButtons";

const rowStyle = {
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const HarmonyRemoteControl = ({ hub }) => {
  const [, dispatch] = useReducer(harmonyReducer, { device: hub.device });
  const harmony = useHarmony(hub.device) || {};
  const { commands, currentActivity, startingActivity, activities, devices } = harmony;

  // render
  if (activities && startingActivity) {
    return <h1>Starting {activities[startingActivity].label}...</h1>;
  }

  if (activities && devices && currentActivity && activities[currentActivity]) {
    return (
      <>
        <RokuButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
        <XBoxButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
        <AppleTVButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
        <TiVoButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
        <ColoredButtons style={rowStyle} commands={commands} hub={harmony} />
        <ABCDButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
        <JoystickButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
        <NumberButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
        <TransportButtons style={rowStyle} dispatch={dispatch} hub={harmony} />
      </>
    );
  }
  return null;
};

//
export default HarmonyRemoteControl;
