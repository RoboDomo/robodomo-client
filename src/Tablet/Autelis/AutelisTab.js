import React, { useReducer } from "react";
import useConfig from "@/hooks/useConfig";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react"
import s from "./AutelisTab.module.css";

import NumberField from "@/common/form/NumberField";
import Clock from "@/common/Clock";
import useAutelis from "@/hooks/useAutelis";
import autelisReducer from "@/hooks/reducers/autelisReducer";
import useWeather from "@/hooks/useWeather";
import MacroTile from "../Dashboard/MacroTile";
import Temperature from "@/common/Temperature";
import Locale from "@/lib/Locale";

const AutelisTab = () => {
  const Config = useConfig();
  const controller = Config.autelis,
    metric = Config.metric,
    location = controller.location;

  const [, dispatch] = useReducer(autelisReducer, { autelis: controller });
  const autelis = useAutelis(),
    {
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
    img = now.iconLink ? (
      <img
        alt={now.iconName}
        style={{
          paddingBottom: 0,
          width: 64,
          height: 64,
        }}
        src={now.iconLink}
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
          {display_city} {img} <Temperature value={now.temperature} />
        </div>
      </div>
    );
  };

  const renderMainSwitch = () => {
    const renderOffButton = () => {
      return (
        <IonSegmentButton
          checked={!poolOn && !spaOn}
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
        </IonSegmentButton>
      );
    };

    const renderPoolButton = () => {
      return (
        <IonSegmentButton
          checked={poolOn}
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
        </IonSegmentButton>
      );
    };

    const renderSpaButton = () => {
      return (
        <IonSegmentButton
          checked={spaOn}
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
        </IonSegmentButton>
      );
    };

    const renderTemp = () => {
      if (poolOn) {
        return (
          <>
            Pool <Temperature value={poolTemp} />
          </>
        );
      } else if (spaOn) {
        return (
          <>
            Spa <Temperature value={spaTemp} />
          </>
        );
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
        <IonSegment className={s.mainSwitch}>
          {renderOffButton()}
          {renderPoolButton()}
          {renderSpaButton()}
        </IonSegment>
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
        <IonSegment className={s.toggle}>
          <IonSegmentButton 
            checked={solarOn} 
            onClick={() => {
              if (!solarOn) {
                dispatch({ type: "solarHeat", value: true });
              }
            }}>
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton 
            checked={!solarOn} 
            onClick={() => {
              if (solarOn) {
                dispatch({ type: "solarHeat", value: false });
              }
            }}>
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 36,
          }}
        >
          Solar <Temperature value={solarTemp} />
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
        <IonSegment className={s.toggle}>
          <IonSegmentButton
            checked={cleaner}
            onClick={() => {
              if (!cleaner) {
                dispatch({ type: "cleaner", value: true });
              }
            }}
          >
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            checked={!cleaner}
            onClick={() => {
              if (cleaner) {
                dispatch({ type: "cleaner", value: false });
              }
            }}
          >
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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
        <IonSegment className={s.toggle}>
          <IonSegmentButton
            checked={waterfall}
            onClick={() => {
              if (!waterfall) {
                dispatch({ type: "waterfall", value: true });
              }
            }}
          >
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            checked={!waterfall}
            onClick={() => {
              if (waterfall) {
                dispatch({ type: "waterfall", value: false });
              }
            }}
          >
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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
        <IonSegment className={s.toggle}>
          <IonSegmentButton
            checked={poolLight}
            onClick={() => {
              if (!poolLight) {
                dispatch({ type: "poolLight", value: true });
              }
            }}
          >
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            checked={!poolLight}
            onClick={() => {
              if (poolLight) {
                dispatch({ type: "poolLight", value: false });
              }
            }}
          >
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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
          <IonSegment className={s.toggle}>
            <IonSegmentButton
              checked={poolHeat}
              onClick={() => {
                if (!poolHeat) {
                  if (spaHeat) {
                    dispatch({ type: "spaHeat", value: false });
                  }
                  dispatch({ type: "poolHeat", value: true });
                }
              }}
            >
              <IonLabel>On</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              checked={!poolHeat}
              onClick={() => {
                if (poolHeat) {
                  dispatch({ type: "poolHeat", value: false });
                }
              }}
            >
              <IonLabel>Off</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <div syle={{ flex: 0.2 }}>
          <NumberField
            name="poolSetpoint"
            value={Locale.ftoc(poolSetpoint, metric)}
            step={metric ? 0.1 : 1}
            onValueChange={newValue => {
              dispatch({
                type: "poolSetpoint",
                value: Locale.ctof(newValue, metric),
              });
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
          <IonSegment className={s.toggle}>
            <IonSegmentButton
              checked={spaHeat}
              onClick={() => {
                if (!spaHeat) {
                  if (!spa) {
                    dispatch({ type: "spa", value: true });
                  }
                  dispatch({ type: "spaHeat", value: true });
                }
              }}
            >
              <IonLabel>On</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              checked={!spaHeat}
              onClick={() => {
                if (spaHeat) {
                  dispatch({ type: "spaHeat", value: false });
                }
              }}
            >
              <IonLabel>Off</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <div syle={{ flex: 0.2 }}>
          <NumberField
            name="spaSetpoint"
            value={Locale.ftoc(spaSetpoint, metric)}
            step={metric ? 0.1 : 1}
            onValueChange={newValue => {
              dispatch({
                type: "spaSetpoint",
                value: Locale.ctof(newValue, metric),
              });
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
        <IonSegment className={s.toggle}>
          <IonSegmentButton
            checked={spaLight}
            onClick={() => {
              if (!spaLight) {
                dispatch({ type: "spaLight", value: true });
              }
            }}
          >
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            checked={!spaLight}
            onClick={() => {
              if (spaLight) {
                dispatch({ type: "spaLight", value: false });
              }
            }}
          >
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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
        <IonSegment className={s.toggle}>
          <IonSegmentButton
            checked={jets}
            onClick={() => {
              if (!jets) {
                dispatch({ type: "jet", value: true });
              }
            }}
          >
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            checked={!jets}
            onClick={() => {
              if (jets) {
                dispatch({ type: "jet", value: false });
              }
            }}
          >
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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
        <IonSegment className={s.toggle}>
          <IonSegmentButton
            checked={blower}
            onClick={() => {
              if (!blower) {
                dispatch({ type: "blower", value: true });
              }
            }}
          >
            <IonLabel>On</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            checked={!blower}
            onClick={() => {
              if (blower) {
                dispatch({ type: "blower", value: false });
              }
            }}
          >
            <IonLabel>Off</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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
