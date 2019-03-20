import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

import MQTT from "lib/MQTT";
import Config from "Config";

const TiVo = ({ device }) => {
  const [channel, setChannel] = useState(0);
  const [channels, setChannels] = useState({});

  useEffect(() => {
    const handleMessage = (topic, message) => {
      if (~topic.indexOf("channels")) {
        try {
          setChannels(JSON.parse(message));
        } catch (e) {
          setChannels(message);
        }
      } else if (~topic.indexOf("channel")) {
        setChannel(message);
      }
    };

    MQTT.subscribe(
      `${Config.mqtt.tivo}/${device.device}/status/channel`,
      handleMessage
    );
    MQTT.subscribe(
      `${Config.mqtt.tvguide}/${device.guide}/status/channels`,
      handleMessage
    );
    return () => {
      MQTT.unsubscribe(
        `${Config.mqtt.tivo}/${device.device}/status/channel`,
        handleMessage
      );
      MQTT.unsubscribe(
        `${Config.mqtt.tvguide}/${device.guide}/status/channels`,
        handleMessage
      );
    };
  }, []);

  const info = channels[channel];
  if (!info) {
    return null;
  }
  return (
    <>
      <Image style={{ width: 64, height: "auto" }} src={info.logo.URL} />
      <div style={{ marginBottom: 8 }}>
        {channel} {info.name}
      </div>
    </>
  );
};
export default TiVo;
