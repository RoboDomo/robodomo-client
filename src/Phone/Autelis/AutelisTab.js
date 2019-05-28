import React, { useState, useEffect } from "react";
import { ListGroup, Card, Form } from "react-bootstrap";

import ToggleField from "@/common/form/ToggleField";
import NumberField from "@/common/form/NumberField";
import Clock from "@/common/Clock";
import MacroItem from "../Dashboard/MacroItem";

import Config from "@/Config";
import MQTT from "@/lib/MQTT";

const AutelisTab = () => {
  const autelis = Config.autelis,
    location = autelis.location,
    forward = autelis.deviceMap.forward,
    backward = autelis.deviceMap.backward;

  const status_topic = Config.mqtt.autelis + "/status/",
    set_topic = status_topic.replace("status", "set"),
    weather_topic = Config.mqtt.weather + "/" + location + "/status/";

  // weather
  const [now, setNow] = useState({});
  const [city, setCity] = useState("");

  // general
  const [pump, setPump] = useState(false);
  const [cleaner, setCleaner] = useState(false);
  const [solarHeat, setSolarHeat] = useState(false);
  const [solarTemp, setSolarTemp] = useState(60);
  // pool
  const [waterfall, setWaterfall] = useState(false);
  const [poolLight, setPoolLight] = useState(false);
  const [poolTemp, setPoolTemp] = useState(60);
  const [poolHeat, setPoolHeat] = useState(false);
  const [poolSetpoint, setPoolSetpoint] = useState(60);
  // spa
  const [spaLight, setSpaLight] = useState(false);
  const [spa, setSpa] = useState(false);
  const [spaTemp, setSpaTemp] = useState(60);
  const [spaHeat, setSpaHeat] = useState(false);
  const [spaSetpoint, setSpaSetpoint] = useState(60);
  const [jets, setJets] = useState(false);
  const [blower, setBlower] = useState(false);

  const topics = [
    "pump",
    "spa",
    "spaTemp",
    "poolTemp",
    "poolSetpoint",
    "spaSetpoint",
    "cleaner",
    "waterfall",
    "poolLight",
    "spaLight",
    "jet",
    "blower",
    "spaHeat",
    "poolHeat",
    "solarHeat",
    "solarTemp",
  ];

  useEffect(() => {
    const handleWeatherChange = (topic, message) => {
      if (~topic.indexOf("now")) {
        setNow(message);
      } else if (~topic.indexOf("display_city")) {
        setCity(message);
      } else {
        console.log("can't weather change", topic, message);
      }
    };

    const handleStateChange = (topic, message) => {
      const key = backward[topic.substr(status_topic.length)];
      const isOn = m => m === "true" || m === "on" || m === "enabled";

      switch (key) {
        case "pump":
          setPump(oldvalue => isOn(message));
          break;
        case "spa":
          setSpa(isOn(message));
          break;
        case "cleaner":
          setCleaner(isOn(message));
          break;
        case "waterfall":
          setWaterfall(isOn(message));
          break;
        case "poolLight":
          setPoolLight(isOn(message));
          break;
        case "jet":
          setJets(oldvalue => isOn(message));
          break;
        case "blower":
          setBlower(isOn(message));
          break;
        case "spaLight":
          setSpaLight(isOn(message));
          break;
        case "spaHeat":
          setSpaHeat(isOn(message));
          break;
        case "poolHeat":
          setPoolHeat(isOn(message));
          break;
        case "solarHeat":
          setSolarHeat(isOn(message));
          break;
        case "solarTemp":
          setSolarTemp(Number(message));
          break;
        case "spaTemp":
          setSpaTemp(Number(message));
          break;
        case "poolTemp":
          setPoolTemp(Number(message));
          break;
        case "spaSetpoint":
          setSpaSetpoint(Number(message));
          break;
        case "poolSetpoint":
          setPoolSetpoint(Number(message));
          break;
        default:
          console.log("====> Unhandled state change", topic, message, key);
          break;
      }
    };

    MQTT.subscribe(weather_topic + "now", handleWeatherChange);
    MQTT.subscribe(weather_topic + "display_city", handleWeatherChange);
    for (const key of topics) {
      MQTT.subscribe(status_topic + forward[key], handleStateChange);
    }

    return () => {
      for (const key of topics) {
        MQTT.unsubscribe(status_topic + forward[key], handleStateChange);
      }
      MQTT.unsubscribe(weather_topic + "now", handleWeatherChange);
      MQTT.unsubscribe(weather_topic + "display_city", handleWeatherChange);
    };
  }, [backward, forward, status_topic, topics, weather_topic]);

  /**
   * Send message to control a device
   */
  const control = (what, state) => {
    const key = forward[what] || what;
    if (typeof state !== "number") {
      state = state ? "on" : "off";
    }
    MQTT.publish(set_topic + key, state);
  };

  //
  // RENDER
  //
  const poolOn = !spa && pump,
    spaOn = spa && pump,
    solarOn = solarHeat && pump;

  const renderPoolTemp = () => {
    if (poolOn) {
      return <span>{poolTemp}&deg;F</span>;
    }
    return "Pool Off";
  };
  const renderSpaTemp = () => {
    if (spaOn) {
      return <span>{spaTemp}&deg;F</span>;
    }
    return "Spa Off";
  };
  const renderSolarTemp = () => {
    if (solarOn) {
      return <span>{solarTemp}&deg;F</span>;
    }
    return "Solar Off";
  };

  const sunrise = new Date(now.sunrise * 1000).toLocaleTimeString().replace(":00 ", " "),
    sunset = new Date(now.sunset * 1000).toLocaleTimeString().replace(":00 ", " "),
    img = now.icon ? (
      <img
        alt={now.icon}
        style={{
          verticalAlign: "middle",
          width: 64,
          height: 64,
        }}
        src={`/img/Weather/icons/black/${now.icon}.svg`}
      />
    ) : null;

  return (
    <div
      style={{
        overflow: "auto",
        height: "100vh",
        padding: 20,
        paddingBottom: 200,
      }}
    >
      <Card>
        <Card.Header>Weather</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", padding: 4 }}>
            <div>{city}</div>
            <div style={{ fontSize: 48, marginBottom: 4 }}>
              {img}
              {now.current_temperature}&deg;F
            </div>
            <div className="clearfix">
              <div style={{ fontSize: 30, marginBottom: 4 }}>
                <Clock />
              </div>
              <div>
                Sunrise: {sunrise} Sunset: {sunset}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card bg={poolOn ? "success" : undefined} text={poolOn ? "white" : undefined}>
        <Card.Header>Pool</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", fontSize: 30, height: 50 }}>{renderPoolTemp()}</div>
          <Form>
            <ToggleField
              label="Pool"
              name="pump"
              toggled={!spa && pump}
              onToggle={toggleState => {
                setPump(toggleState);
                control("pump", toggleState);
              }}
            />
            <ToggleField
              label="Light"
              name="poolLight"
              toggled={poolLight}
              onToggle={toggleState => {
                setPoolLight(toggleState);
                control("poolLight", toggleState);
              }}
            />
            <ToggleField
              label="Waterfall"
              name="waterfall"
              toggled={waterfall}
              onToggle={toggleState => {
                setWaterfall(toggleState);
                control("waterfall", toggleState);
              }}
            />
            <ToggleField
              label="Heat"
              name="poolHeat"
              toggled={poolHeat}
              onToggle={toggleState => {
                setPoolHeat(toggleState);
                control("poolHeat", toggleState);
              }}
            />
            <NumberField
              label="Set Point"
              name="poolSetpoint"
              value={poolSetpoint}
              onValueChange={newValue => {
                setPoolSetpoint(newValue);
                control("poolSetpoint", newValue);
              }}
            />
          </Form>
        </Card.Body>
      </Card>

      <Card bg={spaOn ? "danger" : undefined} text={spaOn ? "white" : undefined}>
        <Card.Header>Spa</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", fontSize: 30 }}>{renderSpaTemp()}</div>
          <Form>
            <ToggleField
              label="Spa"
              name="spa"
              toggled={spaOn}
              onToggle={toggleState => {
                setSpa(toggleState);
                control("spa", toggleState);
              }}
            />
            <ToggleField
              label="Jets"
              name="jet"
              toggled={jets}
              onToggle={toggleState => {
                setJets(toggleState);
                control("jet", toggleState);
              }}
            />
            <ToggleField
              label="Blower"
              name="blower"
              toggled={blower}
              onToggle={toggleState => {
                setBlower(toggleState);
                control("blower", toggleState);
              }}
            />
            <ToggleField
              label="Light"
              name="spaLight"
              toggled={spaLight}
              onToggle={toggleState => {
                setSpaLight(toggleState);
                control("spaLight", toggleState);
              }}
            />
            <ToggleField label="Heat" name="spaHeat" toggled={spaHeat} />
            <NumberField
              label="Set Point"
              name="spaSetpoint"
              value={spaSetpoint}
              onValueChange={newValue => {
                setSpaSetpoint(newValue);
                control("spaSetpoint", newValue);
              }}
            />
          </Form>
        </Card.Body>
      </Card>
      <Card bg={solarOn ? "success" : undefined} text={solarOn ? "white" : "primary"}>
        <Card.Header>Solar</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", fontSize: 30, height: 50 }}>{renderSolarTemp()}</div>
          <Form>
            <ToggleField
              label="Solar"
              toggled={solarHeat}
              name="solar"
              onToggle={toggleState => {
                setSolarHeat(toggleState);
                control("solarHeat", toggleState);
              }}
            />
            <ToggleField
              label="Cleaner"
              toggled={cleaner}
              name="cleaner"
              onToggle={toggleState => {
                setCleaner(toggleState);
                control("cleaner", toggleState);
              }}
            />
            <ToggleField
              label="Pump"
              toggled={pump}
              name="pump"
              onToggle={toggleState => {
                setPump(toggleState);
                control("pump", toggleState);
              }}
            />
          </Form>
        </Card.Body>
      </Card>
      <ListGroup style={{ width: "100%" }}>
        <MacroItem label="Warm Spa" name="Warm Spa" />
        <MacroItem label="Enter Spa" name="Enter Spa" />
        <MacroItem label="Exit Spa" name="Exit Spa" />
        <MacroItem label="Spa Off" name="Spa Off" />
      </ListGroup>
    </div>
  );
};

export default AutelisTab;
