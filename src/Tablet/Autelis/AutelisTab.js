import React, { useState, useEffect } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

import MacroTile from "Dashboard/MacroTile";
import NumberField from "common/form/NumberField";
import Clock from "common/Clock";

import Config from "Config";
import MQTT from "lib/MQTT";

import useWeather from "common/hooks/useWeather";

const AutelisTab = () => {
  const autelis = Config.autelis,
    location = autelis.location,
    forward = autelis.deviceMap.forward,
    backward = autelis.deviceMap.backward;

  const status_topic = Config.mqtt.autelis + "/status/",
    set_topic = status_topic.replace("status", "set");

  const weather = useWeather(location),
    { now, display_city, forecast } = weather;

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
    "solarTemp"
  ];

  const handleStateChange = (topic, message) => {
    const key = backward[topic.substr(status_topic.length)];
    const isOn = m => m === "true" || m === "on" || m === "enabled";

    switch (key) {
      case "pump":
        setPump(isOn(message));
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
        setJets(isOn(message));
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

  useEffect(() => {
    for (const key of topics) {
      MQTT.subscribe(status_topic + forward[key], handleStateChange);
    }

    return () => {
      for (const key of topics) {
        MQTT.unsubscribe(status_topic + forward[key], handleStateChange);
      }
    };
  }, []);

  /**
   * Send message to control a device
   */
  const control = (what, state) => {
    const key = forward[what] || what;
    if (!forward[what]) {
      console.log("forward", what, forward);
    }
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

  const sunrise = new Date(now.sunrise * 1000)
      .toLocaleTimeString()
      .replace(":00 ", " "),
    sunset = new Date(now.sunset * 1000)
      .toLocaleTimeString()
      .replace(":00 ", " "),
    img = now.icon ? (
      <img
        alt={now.icon}
        style={{
          paddingBottom: 0,
          width: 64,
          height: 64
        }}
        src={`/img/Weather/icons/black/${now.icon}.svg`}
      />
    ) : null;

  const renderWeather = () => {
    return (
      <div style={{ fontSize: 36, display: "flex", justifyContent: "end" }}>
        <div style={{ flex: 0.3 }}>
          <Clock />
        </div>
        <div style={{ fontSize: 18, flex: 0.3 }}>
          <div>Sunrise: {sunrise}</div>
          <div>Sunset: {sunset}</div>
        </div>
        <div style={{ fontSize: 38, flex: 1 }}>
          {display_city} {img} {now.current_temperature}&deg;F
        </div>
      </div>
    );
  };

  const renderMainSwitch = () => {
    const renderOffButton = () => {
      return (
        <Button
          variant={!poolOn && !spaOn ? "dark" : undefined}
          onClick={() => {
            if (poolOn) {
              control("pump", false);
            } else if (spaOn) {
              control("spa", false);
            }
            if (cleaner) {
              control("cleaner", false);
            }
            if (solarOn) {
              control("solarHeat", false);
            }
          }}
        >
          OFF
        </Button>
      );
    };

    const renderPoolButton = () => {
      return (
        <Button
          variant={poolOn ? "success" : undefined}
          onClick={() => {
            if (!poolOn) {
              if (!pump) {
                control("pump", true);
              }
              control("spa", false);
            }
          }}
        >
          POOL
        </Button>
      );
    };

    const renderSpaButton = () => {
      return (
        <Button
          variant={spaOn ? "danger" : undefined}
          onClick={() => {
            if (!spaOn) {
              if (!pump) {
                control("pump", true);
              }
              control("spa", true);
            }
          }}
        >
          SPA
        </Button>
      );
    };

    const renderTemp = () => {
      if (poolOn) {
        return <>Pool {poolTemp}&deg;F</>;
      } else if (spaOn) {
        return <>Spa {spaTemp}&deg;F</>;
      } else {
        return <>All Off</>;
      }
    };

    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          {renderOffButton()}
          {renderPoolButton()}
          {renderSpaButton()}
        </ButtonGroup>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 44
          }}
        >
          {renderTemp()}
        </div>
      </div>
    );
  };

  const renderSolar = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={solarOn ? "success" : undefined}
            onClick={() => {
              if (!solarOn) {
                control("solarHeat", true);
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!solarOn ? "dark" : undefined}
            onClick={() => {
              if (solarOn) {
                control("solarHeat", false);
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 36
          }}
        >
          Solar {solarTemp}&deg;F
        </div>
      </div>
    );
  };

  const renderCleaner = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={cleaner ? "success" : undefined}
            onClick={() => {
              if (!cleaner) {
                control("cleaner", true);
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!cleaner ? "dark" : undefined}
            onClick={() => {
              if (cleaner) {
                control("cleaner", false);
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 36
          }}
        >
          Cleaner
        </div>
      </div>
    );
  };

  const renderWaterfall = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24
          }}
        >
          Waterfall
        </div>
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={waterfall ? "success" : undefined}
            onClick={() => {
              if (!waterfall) {
                control("waterfall", true);
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!waterfall ? "dark" : undefined}
            onClick={() => {
              if (waterfall) {
                control("waterfall", false);
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
      </div>
    );
  };

  const renderPoolLight = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24
          }}
        >
          Pool Light
        </div>
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={poolLight ? "success" : undefined}
            onClick={() => {
              if (!poolLight) {
                control("poolLight", true);
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!poolLight ? "dark" : undefined}
            onClick={() => {
              if (poolLight) {
                control("poolLight", false);
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
      </div>
    );
  };

  const renderPoolHeater = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24
          }}
        >
          Pool Heat
        </div>
        <div style={{ flex: 0.6, display: "flex" }}>
          <ButtonGroup style={{ flex: 1 }}>
            <Button
              variant={poolHeat ? "danger" : undefined}
              onClick={() => {
                if (!poolHeat) {
                  if (spa) {
                    control("spa", spa);
                  }
                  control("poolHeat", true);
                }
              }}
            >
              On
            </Button>
            <Button
              variant={!poolHeat ? "dark" : undefined}
              onClick={() => {
                if (poolHeat) {
                  control("poolHeat", false);
                }
              }}
            >
              Off
            </Button>
          </ButtonGroup>
        </div>
        <div syle={{ flex: 0.2 }}>
          <NumberField
            name="poolSetpoint"
            value={poolSetpoint}
            onValueChange={newValue => {
              setPoolSetpoint(newValue);
              control("poolSetpoint", newValue);
            }}
          />
        </div>
      </div>
    );
  };

  const renderSpaHeater = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <div style={{ flex: 0.6, display: "flex" }}>
          <ButtonGroup style={{ flex: 1 }}>
            <Button
              variant={spaHeat ? "danger" : undefined}
              onClick={() => {
                if (!spaHeat) {
                  if (!spa) {
                    control("spa", true);
                  }
                  control("spaHeat", true);
                }
              }}
            >
              On
            </Button>
            <Button
              variant={!spaHeat ? "dark" : undefined}
              onClick={() => {
                if (spaHeat) {
                  control("spaHeat", false);
                }
              }}
            >
              Off
            </Button>
          </ButtonGroup>
        </div>
        <div syle={{ flex: 0.2 }}>
          <NumberField
            name="spaSetPoint"
            value={spaSetpoint}
            onValueChange={newValue => {
              setPoolSetpoint(newValue);
              control("spaSetpoint", newValue);
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24
          }}
        >
          Spa Heat
        </div>
      </div>
    );
  };

  const renderSpaLight = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={spaLight ? "success" : undefined}
            onClick={() => {
              if (!spaLight) {
                control("spaLight", true);
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!spaLight ? "dark" : undefined}
            onClick={() => {
              if (spaLight) {
                control("spaLight", false);
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24
          }}
        >
          Spa Light
        </div>
      </div>
    );
  };

  const renderJets = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={jets ? "success" : undefined}
            onClick={() => {
              if (!jets) {
                control("jet", true);
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!jets ? "dark" : undefined}
            onClick={() => {
              if (jets) {
                control("jet", false);
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24
          }}
        >
          Jets
        </div>
      </div>
    );
  };

  const renderBlower = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={blower ? "success" : undefined}
            onClick={() => {
              if (!blower) {
                control("blower", true);
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!blower ? "dark" : undefined}
            onClick={() => {
              if (blower) {
                control("blower", false);
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24
          }}
        >
          Blower
        </div>
      </div>
    );
  };

  const render = () => {
    return (
      <>
        <div style={{ margin: 8 }}>
          <div style={{ marginLeft: 60 }}>
            {renderWeather()}
            {renderMainSwitch()}
            {renderSolar()}
            {renderCleaner()}
          </div>
          <Row style={{ marginTop: 10 }}>
            <Col sm={6}>
              {renderPoolHeater()}
              {renderPoolLight()}
              {renderWaterfall()}
            </Col>
            <Col sm={6}>
              {renderSpaHeater()}
              {renderJets()}
              {renderSpaLight()}
              {renderBlower()}
            </Col>
          </Row>
          <Row
            style={{
              textAlign: "center",
              marginTop: 10,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <MacroTile label="Warm Spa" name="Warm Spa" width={1} />
            <MacroTile label="Enter Spa" name="Enter Spa" width={1} />
            <MacroTile label="Exit Spa" name="Exit Spa" width={1} />
            <MacroTile label="Spa Off" name="Spa Off" width={1} />
          </Row>
        </div>
      </>
    );
  };

  /*
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
  */
  /*
  const renderPoolControls = () => {
    return (
      <Card
        bg={poolOn ? "success" : undefined}
        text={poolOn ? "white" : undefined}
      >
        <Card.Header>Pool</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", fontSize: 30, height: 50 }}>
            {renderPoolTemp()}
          </div>
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
    );
  };

  const renderSpaControls = () => {
    return (
      <Card
        bg={spaOn ? "danger" : undefined}
        text={spaOn ? "white" : undefined}
      >
        <Card.Header>Spa</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", fontSize: 30 }}>
            {renderSpaTemp()}
          </div>
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
    );
  };

  const renderSolarControls = () => {
    return (
      <Card
        bg={solarOn ? "success" : undefined}
        text={solarOn ? "white" : "primary"}
      >
        <Card.Header>Solar</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "center", fontSize: 30, height: 50 }}>
            {renderSolarTemp()}
          </div>
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
    );
  };
  */
  /*
  const xrender = () => {
    return (
      <div style={{ margin: 8 }}>
        <div style={{ textAlign: "center" }}>{renderMainSwitch()}</div>
        <Row style={{ padding: 16 }}>
          <Col sm={3} style={{ padding: 2 }}>
            {renderWeather()}
          </Col>
          <Col sm={3} style={{ padding: 2 }}>
            {renderPoolControls()}
          </Col>
          <Col sm={3} style={{ padding: 2 }}>
            {renderSpaControls()}
          </Col>
          <Col sm={3} style={{ padding: 2 }}>
            {renderSolarControls()}
          </Col>
        </Row>
        <Row
          style={{
            textAlign: "center",
            marginTop: 10,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <MacroTile label="Warm Spa" name="Warm Spa" width={1} />
          <MacroTile label="Enter Spa" name="Enter Spa" width={1} />
          <MacroTile label="Exit Spa" name="Exit Spa" width={1} />
          <MacroTile label="Spa Off" name="Spa Off" width={1} />
        </Row>
      </div>
    );
  };
  */
  return render();
};

export default AutelisTab;
