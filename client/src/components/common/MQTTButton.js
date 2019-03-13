/**
 * MQTTButton
 *
 * A simple button that publishes a topic/message when clicked.
 */
import React from "react";
import PropTypes from "prop-types";

import Config from "Config";

import MQTT from "lib/MQTT";
import RemoteButton from "components/common/RemoteButton";

const MQTTButton = ({ name, children }) => {
  const topic = Config.mqtt.macros + "/run";
  const message = name;
  return (
    <div>
      <RemoteButton
        onClick={() => {
          MQTT.publish(topic, message);
        }}
      >
        {name}
      </RemoteButton>
    </div>
  );
};

MQTTButton.propTypes = {
  name: PropTypes.string.isRequired
};

export default MQTTButton;
