//import React, { useState, useEffect } from "react";
import React from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

import Config from "@/Config";
import NumberField from "@/common/form/NumberField";
import Clock from "@/common/Clock";
import useAutelis from "@/common/hooks/useAutelis";
import useWeather from "@/common/hooks/useWeather";
import MacroTile from "../Dashboard/MacroTile";

const AutelisTab = () => {
  const controller = Config.autelis,
    location = controller.location;

  const autelis = useAutelis(),
    {
      dispatch,
      pump,
      cleaner,
      solarHeat,
      solarTemp,
      waterfall,
      poolLight,
      poolTemp,
      poolHeat,
      poolSetpoint,
      spaLight,
      spa,
      spaTemp,
      spaHeat,
      spaSetpoint,
      jets,
      blower,
    } = autelis;

  const weather = useWeather(location),
    { now, display_city } = weather;

  //
  // RENDER
  //
  const poolOn = !spa && pump,
    spaOn = spa && pump,
    solarOn = solarHeat && pump;

  const sunrise = new Date(now.sunrise * 1000).toLocaleTimeString().replace(":00 ", " "),
    sunset = new Date(now.sunset * 1000).toLocaleTimeString().replace(":00 ", " "),
    img = now.icon ? (
      <img
        alt={now.icon}
        style={{
          paddingBottom: 0,
          width: 64,
          height: 64,
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
              dispatch({ type: "pump", value: false });
            } else if (spaOn) {
              dispatch({ type: "spa", value: false });
            }
            if (cleaner) {
              dispatch({ type: "cleaner", value: false });
            }
            if (solarOn) {
              dispatch({ type: "solarHeat", value: false });
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
                dispatch({ type: "pump", value: true });
              }
              dispatch({ type: "spa", value: false });
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
                dispatch({ type: "pump", value: true });
              }
              dispatch({ type: "spa", value: true });
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
          display: "flex",
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
            fontSize: 44,
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
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={solarOn ? "success" : undefined}
            onClick={() => {
              if (!solarOn) {
                dispatch({ type: "solarHeat", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!solarOn ? "dark" : undefined}
            onClick={() => {
              if (solarOn) {
                dispatch({ type: "solarHeat", value: false });
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
            fontSize: 36,
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
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={cleaner ? "success" : undefined}
            onClick={() => {
              if (!cleaner) {
                dispatch({ type: "cleaner", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!cleaner ? "dark" : undefined}
            onClick={() => {
              if (cleaner) {
                dispatch({ type: "cleaner", value: false });
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
            fontSize: 36,
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
          marginTop: 8,
        }}
      >
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24,
          }}
        >
          Waterfall
        </div>
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={waterfall ? "success" : undefined}
            onClick={() => {
              if (!waterfall) {
                dispatch({ type: "waterfall", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!waterfall ? "dark" : undefined}
            onClick={() => {
              if (waterfall) {
                dispatch({ type: "waterfall", value: false });
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
          marginTop: 8,
        }}
      >
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24,
          }}
        >
          Pool Light
        </div>
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={poolLight ? "success" : undefined}
            onClick={() => {
              if (!poolLight) {
                dispatch({ type: "poolLight", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!poolLight ? "dark" : undefined}
            onClick={() => {
              if (poolLight) {
                dispatch({ type: "poolLight", value: false });
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
          marginTop: 8,
        }}
      >
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24,
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
                  if (spaHeat) {
                    dispatch({ type: "spaHeat", value: false });
                  }
                  dispatch({ type: "poolHeat", value: true });
                }
              }}
            >
              On
            </Button>
            <Button
              variant={!poolHeat ? "dark" : undefined}
              onClick={() => {
                if (poolHeat) {
                  dispatch({ type: "poolHeat", value: false });
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
              dispatch({ type: "poolSetpoint", value: newValue });
              //              setPoolSetpoint(newValue);
              //              control("poolSetpoint", newValue);
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
          marginTop: 8,
        }}
      >
        <div style={{ flex: 0.6, display: "flex" }}>
          <ButtonGroup style={{ flex: 1 }}>
            <Button
              variant={spaHeat ? "danger" : undefined}
              onClick={() => {
                if (!spaHeat) {
                  if (!spa) {
                    dispatch({ type: "spa", value: true });
                  }
                  dispatch({ type: "spaHeat", value: true });
                }
              }}
            >
              On
            </Button>
            <Button
              variant={!spaHeat ? "dark" : undefined}
              onClick={() => {
                if (spaHeat) {
                  dispatch({ type: "spaHeat", value: false });
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
              dispatch({ type: "spaSetpoint", value: newValue });
              //              setPoolSetpoint(newValue);
              //              control("spaSetpoint", newValue);
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 24,
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
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={spaLight ? "success" : undefined}
            onClick={() => {
              if (!spaLight) {
                dispatch({ type: "spaLight", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!spaLight ? "dark" : undefined}
            onClick={() => {
              if (spaLight) {
                dispatch({ type: "spaLight", value: false });
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
            fontSize: 24,
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
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={jets ? "success" : undefined}
            onClick={() => {
              if (!jets) {
                dispatch({ type: "jet", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!jets ? "dark" : undefined}
            onClick={() => {
              if (jets) {
                dispatch({ type: "jet", value: false });
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
            fontSize: 24,
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
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={blower ? "success" : undefined}
            onClick={() => {
              if (!blower) {
                dispatch({ type: "blower", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!blower ? "dark" : undefined}
            onClick={() => {
              if (blower) {
                dispatch({ type: "blower", value: false });
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
            fontSize: 24,
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
              justifyContent: "center",
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

  return render();
};

export default AutelisTab;
