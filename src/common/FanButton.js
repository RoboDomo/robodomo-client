import React, { useState, useEffect } from "react";
import { useFan } from "@/hooks/useSmartThings";

import RemoteButton from "@/common/RemoteButton";

const FanButton = ({ name }) => {
  const fan = useFan(name);

  const handleClick = () => {
    let value = 25;

    if (power === "off") {
      value = 25;
    } else if (level < 34) {
      value = 50;
    } else if (level < 67) {
      value = 75;
    } else {
      value = 0;
    }

    if (value) {
      fan.switch = "on";
      setTimeout(() => {
        fan.level = value;
      }, 250);
    } else {
      fan.switch = "off";
    }
  };

  let value = "Off";
  if (fan.switch === "on") {
    if (fan.level < 34) {
      value = "Low";
    } else if (fan.level < 67) {
      value = "Medium";
    } else {
      value = "High";
    }
  }
  return (
    <div>
      <RemoteButton onClick={handleClick}>{value}</RemoteButton>
    </div>
  );
};

//
export default FanButton;
