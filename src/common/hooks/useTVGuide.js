import { useState, useEffect } from "react";

import MQTT from "lib/MQTT";
import Config from "Config";

const useTVGuide = guide => {
  const [channels, setChannels] = useState({});

  useEffect(() => {
    const handleChannels = (topic, message) => {
      setChannels(message);
    };

    MQTT.subscribe(
      `${Config.mqtt.tvguide}/${guide}/status/channels`,
      handleChannels
    );

    return () => {
      MQTT.unsubscribe(
        `${Config.mqtt.tvguide}/${guide}/status/channels`,
        handleChannels
      );
    };
  }, []);

  return {
    channels: channels
  };
};

export default useTVGuide;
