import React, { useReducer, useEffect, useState } from "react";
import cx from "classnames";
import useConfig from "@/hooks/useConfig";
import searchUnsplash from "@/lib/unsplash";
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonToggle,
  IonCardHeader,
} from "@ionic/react";
import s from "./AutelisTab.module.css";

import NumberField from "@/common/form/NumberField";
import Clock from "@/common/Clock";
import useAutelis from "@/hooks/useAutelis";
import autelisReducer from "@/hooks/reducers/autelisReducer";
import useWeather from "@/hooks/useWeather";
import Temperature from "@/common/Temperature";
import Locale from "@/lib/Locale";

import { ReactComponent as Sunrise } from "@/icons/sunrise.svg";
import { ReactComponent as Sunset } from "@/icons/sunset.svg";
import { ReactComponent as Whirlpool } from "@/icons/whirlpool.svg";
import { ReactComponent as Pool } from "@/icons/pool.svg";
import { ReactComponent as Solar } from "@/icons/solar.svg";

const Header = ({ now, city }) => {
  // find a photo that matches the city and weather description
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    searchUnsplash(`${city} ${now.description}`).then(setPhoto);
  }, [city, now.description, photo]);

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
  return (
    <header className={s.weatherHeader} style={{ backgroundImage: `url(${photo})` }}>
      <div className={s.weatherShim}>
        <div className={s.clock}>
          <Clock />
        </div>
        <div className={s.sun}>
          <div className={s.sunstate}>
            <Sunrise /> {sunrise}
          </div>
          <div className={s.sunstate}>
            <Sunset /> {sunset}
          </div>
        </div>
        <h1 className={s.city}>{city}</h1>
        <div className={s.temperature}>
          {img} <Temperature value={now.temperature} />
        </div>
      </div>
    </header>
  );
};

const SectionHeader = ({ isOn, temp, onToggle, title, Icon }) => (
  <header className={cx(s.sectionHeader, { [s.areaOn]: isOn })}>
    <aside>
      <h2 className={s.sectionTitle}>
        {title} {isOn ? <Temperature value={temp} /> : null}
      </h2>
    </aside>
    <aside>
      <Icon className={s.svgHeader} />
      <IonToggle checked={isOn} onIonChange={onToggle} />
    </aside>
  </header>
);

const SegmentedToggle = ({ on, type }) => {
  const Config = useConfig();
  const controller = Config.autelis;
  const [, dispatch] = useReducer(autelisReducer, { autelis: controller });

  return (
    <IonSegment className={s.toggle} color={on ? "success" : undefined}>
      <IonSegmentButton
        checked={on}
        onClick={() => {
          if (!on) {
            dispatch({ type: type, value: true });
          }
        }}
      >
        <IonLabel>On</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton
        checked={!on}
        onClick={() => {
          if (on) {
            dispatch({ type: type, value: false });
          }
        }}
      >
        <IonLabel>Off</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

const ToggledStatus = ({ title, ...rest }) => (
  <IonCard className={s.statusFieldContainer} color="dark">
    <IonCardHeader className={s.statusTitle} color="dark">
      <div className="h4">{title}</div>
    </IonCardHeader>
    <IonCardContent>
      <SegmentedToggle {...rest} />
    </IonCardContent>
  </IonCard>
);

const Heater = ({ title, temp, tempType, ...rest }) => {
  const Config = useConfig();
  const controller = Config.autelis;
  const metric = Config.metric;
  const [, dispatch] = useReducer(autelisReducer, { autelis: controller });
  return (
    <IonCard color="dark">
      <IonCardHeader className={s.statusTitle} color="dark">
        <div className="h4">{title}</div>
      </IonCardHeader>
      <IonCardContent className={s.tempLine}>
        <SegmentedToggle {...rest} />
        <NumberField
          name="temp"
          value={Locale.ftoc(temp, metric)}
          step={metric ? 0.1 : 1}
          onValueChange={newValue => {
            dispatch({
              type: tempType,
              value: Locale.ctof(newValue, metric),
            });
          }}
        />
      </IonCardContent>
    </IonCard>
  );
};

const AutelisTab = () => {
  const Config = useConfig();
  if (!Config) {
    return null;
  }
  const controller = Config.autelis,
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

  // console.log(weather, now, display_city, location);

  const poolOn = !!pump,
    spaOn = !!spa,
    solarOn = solarHeat && pump;

  return (
    <>
      <Header now={now} city={display_city} />
      <main className={s.container}>
        <section data-testid="pool">
          <SectionHeader
            title="Pool"
            isOn={poolOn}
            temp={poolTemp}
            Icon={Pool}
            onToggle={() => {
              dispatch({ type: "pump", value: !poolOn });
              dispatch({ type: "solarHeat", value: !poolOn });
              if (cleaner) {
                dispatch({ type: "cleaner", value: !poolOn });
              }
            }}
          />
          <ToggledStatus on={cleaner} title="Cleaner" type="cleaner" />
          <Heater
            on={poolHeat}
            title="Heater"
            type="poolHeat"
            temp={poolSetpoint}
            tempType="poolSetpoint"
          />
          <ToggledStatus on={poolLight} title="Pool Light" type="poolLight" />
          <ToggledStatus on={waterfall} title="Waterfall" type="waterfall" />
        </section>

        <section data-testid="spa" style={{ gridRow: "1/3" }}>
          <SectionHeader
            title="SPA"
            isOn={spaOn}
            temp={spaTemp}
            Icon={Whirlpool}
            onToggle={() => {
              dispatch({ type: "spa", value: !spaOn });
            }}
          />
          <ToggledStatus on={cleaner} title="Cleaner" type="cleaner" />
          <Heater
            on={spaHeat}
            title="Heater"
            type="spaHeat"
            temp={spaSetpoint}
            tempType="spaSetpoint"
          />
          <ToggledStatus on={jets} title="Jets" type="jet" />
          <ToggledStatus on={spaLight} title="Light" type="spaLight" />
          <ToggledStatus on={blower} title="Blower" type="blower" />
          <ToggledStatus on={spaHeat} title="Heater" type="spaHeat" />
        </section>

        <section data-testid="solar">
          <SectionHeader
            title="Solar"
            isOn={solarOn}
            temp={solarTemp}
            Icon={Solar}
            onToggle={() => {
              dispatch({ type: "solarHeat", value: !solarOn });
            }}
          />
          <ToggledStatus on={solarOn} title="Solar" type="solarHeat" />
        </section>
      </main>
    </>
  );
};

export default AutelisTab;
