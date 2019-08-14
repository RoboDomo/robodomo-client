import React, { useReducer } from "react";
import Thermostat from "react-nest-thermostat";

import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/react";

import useConfig from "@/hooks/useConfig";
import useWeather from "@/hooks/useWeather";
import useThermostat from "@/hooks/useThermostat";
import thermostatReducer from "@/hooks/reducers/thermostatReducer";
import Locale from "@/lib/Locale";
import Temperature from "@/common/Temperature";
import AnimatedStack from "@/common/AnimatedStack";
import AnimatedDiv from "@/common/AnimatedDiv";
import NumberField from "@/common/form/NumberField";

import s from "./ThermostatTab.module.css";

const TargetButton = ({ target, color, thermostat, handler }) => {
  let icon = <IonIcon name="arrow-dropright" />,
    disabled = false;

  if (thermostat.target_temperature_f > target) {
    icon = <IonIcon name="arrow-dropdown" />;
  } else if (thermostat.target_temperature_f < target) {
    icon = <IonIcon name="arrow-dropup" />;
  } else {
    icon = <IonIcon name="arrow-dropright" />;
    disabled = true;
  }
  return (
    <IonItem>
      <IonButton disabled={disabled} color={color} onClick={() => handler(target)}>
        {icon} Set to <Temperature value={target} />
      </IonButton>
    </IonItem>
  );
};

const TargetTemperatures = ({ mode, thermostat, handler }) => {
  switch (mode) {
    case "Off":
    default:
      return null;
    case "heat":
      return (
        <IonList>
          {Array.from(new Array(9), (_, idx) => (
            <TargetButton
              target={idx + 69}
              color="primary"
              thermostat={thermostat}
              handler={handler}
            />
          )).reverse()}
        </IonList>
      );
    case "cool":
      return (
        <IonList>
          <AnimatedStack>
            {Array.from(new Array(9), (_, idx) => (
              <TargetButton
                target={idx + 73}
                color="secondary"
                thermostat={thermostat}
                handler={handler}
              />
            )).reverse()}
          </AnimatedStack>
        </IonList>
      );
  }
};

const ThermostatTab = ({ thermostat }) => {
  const device = thermostat.device;
  const Config = useConfig(),
    metric = Config.metric;
  const thermoState = useThermostat(device);
  const [, dispatch] = useReducer(thermostatReducer, { device: device });
  const weather = useWeather(thermoState ? thermoState.postal_code : null),
    { now } = weather;

  if (!thermoState) {
    return null;
  }
  const hvacModeChange = mode => {
    try {
      dispatch({ type: "hvac_mode", value: mode });
    } catch (e) {}
  };

  const setTargetTemperature = temp => {
    try {
      dispatch({ type: "target_temp", value: temp });
    } catch (e) {}
  };

  const render = () => {
    const thermostat = thermoState;

    if (!thermostat || !thermostat.away) {
      return null;
    }

    // RENDER
    if (!thermostat.ambient_temperature_f || !thermostat.target_temperature_f) {
      return null;
    }

    return (
      <section className={s.layoutContainer}>
        <div>
          <IonList lines="full">
            <IonItem>
              <IonLabel>Presence</IonLabel>
              <span>{thermostat.away.toUpperCase()}</span>
            </IonItem>
            <IonItem>
              <IonLabel>Ambient Temperature</IonLabel>
              <span>
                <Temperature value={thermostat.ambient_temperature_f} />
              </span>
            </IonItem>
            <IonItem>
              <IonLabel>Ambient Humidity</IonLabel>
              <span>{thermostat.humidity}%</span>
            </IonItem>
            <IonItem>
              <IonLabel>Mode</IonLabel>
              <span>{thermostat.hvac_mode}</span>
            </IonItem>
            <IonItem>
              <IonLabel>Operating State</IonLabel>
              <span>{thermostat.hvac_state}</span>
            </IonItem>
          </IonList>
          <IonList lines="full">
            <IonItem>
              <IonLabel>{thermostat.structure_name}</IonLabel>
              <span>{thermostat.postal_code}</span>
            </IonItem>
            <IonItem>
              <IonLabel>Outside Temperature</IonLabel>
              <span>
                <Temperature value={now.temperature} />
              </span>
            </IonItem>
            <IonItem>
              <IonLabel>Outside Humidity</IonLabel>
              <span>{now.humidity}%</span>
            </IonItem>
            <IonItem>
              <IonLabel>Conditions</IonLabel>
              <span>{now.description}</span>
            </IonItem>
          </IonList>
        </div>
        {/* Center screen */}
        <div className={s.main}>
          <AnimatedDiv
            className={s.thermostat}
            animate={{ scale: [0.7, 1.05, 1], opacity: [0.5, 1] }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <Thermostat
              away={Boolean(thermostat.away !== "home")}
              ambientTemperature={Locale.ftoc(thermostat.ambient_temperature_f, metric)}
              targetTemperature={Locale.ftoc(thermostat.target_temperature_f, metric)}
              hvacMode={thermostat.hvac_state}
              leaf={thermostat.has_leaf}
            />
          </AnimatedDiv>
          <NumberField
            value={Locale.ftoc(thermostat.target_temperature_f, metric)}
            onValueChange={value => {
              setTargetTemperature(value);
            }}
          />
          <IonSegment onIonChange={e => hvacModeChange(e.detail.value)}>
            {["off", "heat", "cool", "heat-cool", "eco"].map(value => (
              <IonSegmentButton value={value} checked={thermostat.hvac_mode === value}>
                <IonLabel className={s.hvacTabTitle}>{value.replace("-", "/")}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </div>
        {/* East */}
        <div>
          <IonList lines="full">
            <IonItem>
              <IonLabel>Target Temperature</IonLabel>
              <Temperature value={thermostat.target_temperature_f} />
            </IonItem>
            <IonItem>
              <IonLabel>Time To Target</IonLabel>
              <Temperature value={thermostat.time_to_target} />
            </IonItem>
          </IonList>
          <TargetTemperatures
            thermostat={thermostat}
            handler={setTargetTemperature}
            mode={thermoState.hvac_mode}
          />
        </div>
      </section>
    );
  };

  return render();
};

export default ThermostatTab;
