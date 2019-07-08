import React, { useState, useEffect } from "react";

import MQTT from "@/lib/MQTT";

import Temperature from "@/common/Temperature";

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useSwitch = (device, sw = "switch") => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleSwitch = (topic, message) => {
      setToggle(message);
    };
    MQTT.subscribe(`smartthings/${device}/${sw}`, handleSwitch);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${sw}`, handleSwitch);
    };
  }, [device, sw]);

  return {
    type: "switch",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(val) {
      //      const value = val; // === "off" || val === false ? "off" : "on";
      MQTT.publish(`smartthings/${device}/${sw}/set`, val);
      setToggle(val);
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useDimmer = (device, sw = "switch", lvl = "level") => {
  const [toggle, setToggle] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleToggle = (topic, message) => {
      setToggle(message);
    };
    const handleLevel = (topic, message) => {
      setLevel(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/${sw}`, handleToggle);
    MQTT.subscribe(`smartthings/${device}/${lvl}`, handleLevel);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${sw}`, handleToggle);
      MQTT.unsubscribe(`smartthings/${device}/${lvl}`, handleLevel);
    };
  }, [device, lvl, sw]);

  return {
    type: "dimmer",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(sw) {
      const value = sw; //  === "off" || sw === false ? "off" : "on";
      MQTT.publish(`smartthings/${device}/${sw}/set`, value);
      setToggle(value);
    },
    get level() {
      return level;
    },
    set level(l) {
      MQTT.publish(`smartthings/${device}/${lvl}/set`, l);
      setLevel(Number(l));
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useFan = (device, sw = "switch", lvl = "level") => {
  const [toggle, setToggle] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleToggle = (topic, message) => {
      setToggle(message);
    };
    const handleLevel = (topic, message) => {
      setLevel(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/${sw}`, handleToggle);
    MQTT.subscribe(`smartthings/${device}/${lvl}`, handleLevel);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${sw}`, handleToggle);
      MQTT.unsubscribe(`smartthings/${device}/${lvl}`, handleLevel);
    };
  }, [device, lvl, sw]);

  return {
    type: "fan",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(sw) {
      const value = sw; // === "off" || sw === false ? "off" : "on";
      MQTT.publish(`smartthings/${device}/${sw}/set`, value);
      setToggle(value);
    },
    get level() {
      return level;
    },
    set level(l) {
      l = Number(l);
      if (l === 0) {
        MQTT.publish(`smartthings/${device}/${lvl}/set`, "off");
      }
      MQTT.publish(`smartthings/${device}/${lvl}/set`, l);
      setLevel(l);
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useMotion = (device, key = "motion") => {
  const [motion, setMotion] = useState("");

  useEffect(() => {
    const handleMotion = (topic, message) => {
      setMotion(message);
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handleMotion);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handleMotion);
    };
  }, [device, key]);

  return { type: "motion", name: device, motion: motion, formatted: motion.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const usePresence = (device, key = "presence") => {
  const [presence, setPresence] = useState("");

  useEffect(() => {
    const handlePresence = (topic, message) => {
      setPresence(message);
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handlePresence);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handlePresence);
    };
  }, [device, key]);

  return { type: "presence", name: device, presence: presence, formatted: presence.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useButton = (device, key = "button") => {
  const [button, setButton] = useState("");

  useEffect(() => {
    const handleButton = (topic, message) => {
      setButton(message);
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handleButton);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handleButton);
    };
  }, [device, key]);

  return { type: "button", name: device, button: button, formatted: button.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useTemperature = (device, key = "temperature") => {
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    const handleTemperature = (topic, message) => {
      setTemperature(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handleTemperature);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handleTemperature);
    };
  }, [device, key]);

  return {
    type: "temperature",
    name: device,
    temperature: temperature,
    formatted: temperature ? <span>{temperature}&deg;F</span> : "",
    metric: temperature ? <Temperature value={temperature} metric={true} /> : "",
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useContact = (device, key = "contact") => {
  const [contact, setContact] = useState("closed");

  useEffect(() => {
    const handleContact = (topic, message) => {
      setContact(message);
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handleContact);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handleContact);
    };
  }, [device, key]);

  return { type: "contact", name: device, contact: contact, formatted: contact.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useBattery = (device, key = "battery") => {
  const [battery, setBattery] = useState("");

  useEffect(() => {
    const handleBattery = (topic, message) => {
      setBattery(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handleBattery);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handleBattery);
    };
  }, [device, key]);

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

const useHumidity = (device, key = "humidity") => {
  const [humidity, setHumidity] = useState("");

  useEffect(() => {
    const handleHumidity = (topic, message) => {
      setHumidity(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handleHumidity);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handleHumidity);
    };
  }, [device, key]);

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

const useIlluminance = (device, key = "illuminance") => {
  const [illuminance, setIlluminance] = useState("");

  useEffect(() => {
    const handleIlluminance = (topic, message) => {
      setIlluminance(Number(message));
    };
    MQTT.subscribe(`smartthings/${device}/${key}`, handleIlluminance);
    return () => {
      MQTT.unsubscribe(`smartthings/${device}/${key}`, handleIlluminance);
    };
  }, [device, key]);

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
