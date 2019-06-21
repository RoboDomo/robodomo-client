import { useState, useEffect } from "react";
import useConfig from "@/hooks/useConfig";

import MQTT from "@/lib/MQTT";

const useTVGuide = guide => {
  const Config = useConfig();
  const [channels, setChannels] = useState({});

  useEffect(() => {
    const handleChannels = (topic, message) => {
      setChannels(message);
    };

    MQTT.subscribe(`${Config.mqtt.tvguide}/${guide}/status/channels`, handleChannels);

    return () => {
      MQTT.unsubscribe(`${Config.mqtt.tvguide}/${guide}/status/channels`, handleChannels);
    };
  }, [Config.mqtt.tvguide, guide]);

  return {
    channels: channels,
  };
};

//
export default useTVGuide;
