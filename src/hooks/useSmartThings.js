import React, { useState, useEffect } from "react";

import MQTT from "@/lib/MQTT";

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useSwitch = device => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleSwitch = (topic, message) => {
      setToggle(message);
    };
    MQTT.subscribe(`smartthings/${device}/switch`, handleSwitch);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/switch`, handleSwitch);
    };
  }, [device]);

  return {
    type: "switch",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(sw) {
      const value = sw; // === "off" || sw === false ? "off" : "on";
      MQTT.publish(`smartthings/${device}/switch/set`, value);
      setToggle(value);
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useDimmer = device => {
  const [toggle, setToggle] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleToggle = (topic, message) => {
      setToggle(message);
    };
    const handleLevel = (topic, message) => {
      setLevel(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/switch`, handleToggle);
    MQTT.subscribe(`smartthings/${device}/level`, handleLevel);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/switch`, handleToggle);
      MQTT.unsubscribe(`smartthings/${device}/level`, handleLevel);
    };
  }, [device]);

  return {
    type: "dimmer",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(sw) {
      const value = sw; //  === "off" || sw === false ? "off" : "on";
      MQTT.publish(`smartthings/${device}/switch/set`, value);
      setToggle(value);
    },
    get level() {
      return level;
    },
    set level(l) {
      MQTT.publish(`smartthings/${device}/level/set`, l);
      setLevel(Number(l));
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useFan = device => {
  const [toggle, setToggle] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleToggle = (topic, message) => {
      setToggle(message);
    };
    const handleLevel = (topic, message) => {
      setLevel(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/switch`, handleToggle);
    MQTT.subscribe(`smartthings/${device}/level`, handleLevel);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/switch`, handleToggle);
      MQTT.unsubscribe(`smartthings/${device}/level`, handleLevel);
    };
  }, [device]);

  return {
    type: "fan",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(sw) {
      const value = sw; // === "off" || sw === false ? "off" : "on";
      MQTT.publish(`smartthings/${device}/switch/set`, value);
      setToggle(value);
    },
    get level() {
      return level;
    },
    set level(l) {
      l = Number(l);
      if (l === 0) {
        MQTT.publish(`smartthings/${device}/switch/set`, "off");
      }
      MQTT.publish(`smartthings/${device}/level/set`, l);
      setLevel(l);
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useMotion = device => {
  const [motion, setMotion] = useState("");
  useEffect(() => {
    const handleMotion = (topic, message) => {
      setMotion(message);
    };
    MQTT.subscribe(`smartthings/${device}/motion`, handleMotion);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/motion`, handleMotion);
    };
  }, [device]);
  return { type: "motion", name: device, motion: motion, formatted: motion.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const usePresence = device => {
  const [presence, setPresence] = useState("");
  useEffect(() => {
    const handlePresence = (topic, message) => {
      setPresence(message);
    };
    MQTT.subscribe(`smartthings/${device}/presence`, handlePresence);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/presence`, handlePresence);
    };
  }, [device]);

  return { type: "presence", name: device, presence: presence, formatted: presence.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useButton = device => {
  const [button, setButton] = useState("");
  useEffect(() => {
    const handleButton = (topic, message) => {
      setButton(message);
    };
    MQTT.subscribe(`smartthings/${device}/button`, handleButton);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/button`, handleButton);
    };
  }, [device]);

  return { type: "button", name: device, button: button, formatted: button.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useTemperature = device => {
  const [temperature, setTemperature] = useState("");
  useEffect(() => {
    const handleTemperature = (topic, message) => {
      setTemperature(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/temperature`, handleTemperature);
    MQTT.subscribe(`smartthings/${device}/ambient_temperature_f`, handleTemperature);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/temperature`, handleTemperature);
      MQTT.unsubscribe(`smartthings/${device}/ambient_temperature_f`, handleTemperature);
    };
  }, [device]);

  return {
    type: "temperature",
    name: device,
    temperature: temperature,
    formatted: temperature ? <span>{temperature}&deg;F</span> : "",
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useContact = device => {
  const [contact, setContact] = useState("closed");

  useEffect(() => {
    const handleContact = (topic, message) => {
      setContact(message);
    };
    MQTT.subscribe(`smartthings/${device}/contact`, handleContact);
  });

  return { type: "contact", name: device, contact: contact, formatted: contact.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useBattery = device => {
  const [battery, setBattery] = useState("");
  useEffect(() => {
    const handleBattery = (topic, message) => {
      setBattery(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/battery`, handleBattery);
  });
  return {
    type: "battery",
    name: device,
    battery: battery,
    formatted: battery ? battery + "%" : "",
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useHumidity = device => {
  const [humidity, setHumidity] = useState("");
  useEffect(() => {
    const handleHumidity = (topic, message) => {
      setHumidity(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/humidity`, handleHumidity);
  });
  return {
    type: "humidity",
    name: device,
    humidity: humidity,
    formatted: humidity ? humidity + "%" : "",
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useIlluminance = device => {
  const [illuminance, setIlluminance] = useState("");
  useEffect(() => {
    const handleIlluminance = (topic, message) => {
      setIlluminance(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/illuminance`, handleIlluminance);
  });
  return { type: "illuminance", name: device, illuminance: illuminance, formatted: illuminance };
};

//
export {
  useSwitch,
  useDimmer,
  useFan,
  useMotion,
  usePresence,
  useButton,
  useTemperature,
  useContact,
  useBattery,
  useHumidity,
  useIlluminance,
};
