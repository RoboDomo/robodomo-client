import React, { useState, useEffect, useReducer } from "react";

import useAppleTV from "@/hooks/useAppleTV";

const appName = n => {
  if (n === "com.google.ios.youtube") {
    return "YouTube";
  }
  return n;
};

const formatTime = (seconds, trim = true) => {
  const d = new Date(null);
  d.setSeconds(seconds);
  const formatted = d.toISOString().substr(11, 8);
  if (trim && formatted.substr(0, 3) === "00:") {
    return formatted.substr(3);
  } else {
    return formatted;
  }
};

const AppleTV = ({ device }) => {
  const atv = useAppleTV(device),
    elapsedTime = atv ? atv.elapsedTime : 0,
    info = atv ? atv.info : null;

  const renderPlaybackState = () => {
    if (!info) {
      return null;
    }

    if (info.totalTime) {
      return (
        <>
          {info.playbackState.toUpperCase()} {formatTime(elapsedTime)} /{" "}
          {formatTime(info.totalTime)}
        </>
      );
    } else {
      return <>{info.playbackState.toUpperCase()}</>;
    }
  };

  if (!info) {
    return <div>Not Playing</div>;
  }

  const app = appName(info.appDisplayName || info.appBundleIdentifier);
  return (
    <div style={{ height: undefined, textAlign: "center", marginBottom: 4 }}>
      <div style={{ fontSize: 16 }}>{app}</div>
      <div>
        {info.title}
        <br />
        <div style={{ fontWeight: "bold" }}>{renderPlaybackState()}</div>
      </div>
    </div>
  );
};

//
export default AppleTV;
