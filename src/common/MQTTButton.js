/**
 * MQTTButton
 *
 * A simple button that publishes a topic/message when clicked.
 */
import React from "react";
import PropTypes from "prop-types";
import useConfig from "@/common/hooks/useConfig";

import MQTT from "@/lib/MQTT";
import RemoteButton from "common/RemoteButton";

const MQTTButton = ({ name, children }) => {
  const Config = useConfig();
  const message = name;
  return (
    <div>
      <RemoteButton
        onClick={() => {
          MQTT.publish(Config.mqtt.macros + "/run", message);
        }}
      >
        {children}
      </RemoteButton>
    </div>
  );
};

//
MQTTButton.propTypes = {
  name: PropTypes.string.isRequired,
};

//
export default MQTTButton;
