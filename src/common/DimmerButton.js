import React from "react";

import { useDimmer } from "@/hooks/useSmartThings";
import RemoteButton from "@/common/RemoteButton";

const DimmerButton = ({ children, name }) => {
  const dimmer = useDimmer(name);

  const handleClick = () => {
    if (dimmer.switch === "on") {
      dimmer.switch = "off";
    } else {
      dimmer.switch = "on";
    }
  };

  const value = dimmer.switch === "on" ? Number(dimmer.level) + "%" : "Off";
  return (
    <div>
      <RemoteButton onClick={handleClick}>{value}</RemoteButton>
    </div>
  );
};

//
export default DimmerButton;
