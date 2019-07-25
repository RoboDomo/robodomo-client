import React from "react";
import { format, parseISO } from "date-fns";
import OnIdle from "@modus/react-idle";
import cx from "classnames";
import { FaFlag } from "react-icons/fa";

import Clock from "@/common/Clock";
import useWeather from "@/hooks/useWeather";
import Temperature from "@/common/Temperature";
import Speed from "@/common/Speed";
import Distance from "@/common/Distance";

import AnimatedStack from "@/common/AnimatedStack";

import s from "./WeatherTab.module.css";

const Hourly = ({ data }) => (
  <AnimatedStack
    onScroll={e => e.stopPropagation()}
    className={s.forecastContainerHourly}
    data-testid="weather-hourly"
  >
    {data.map((data, i) => {
      if (data.localTime === undefined) {
        return null;
      }

      const localTime = format(parseISO(data.localTime), "h:mm aa");
      return (
        <div key={i} className={s.hourlyItem}>
          <div className="small" data-testid="weather-hourly-item">
            {localTime}
          </div>
          <img
            className={s.img_small}
            alt={data.skyDescription}
            title={data.description}
            src={data.iconLink}
          />
          <h4>
            <Temperature value={data.temperature} />
          </h4>
        </div>
      );
    })}
  </AnimatedStack>
);

const Daily = ({ data }) => {
  let lastDay = "";
  return (
    <AnimatedStack
      onScroll={e => e.stopPropagation()}
      data-testid="weather-daily"
      className={s.forecastContainerDaily}
    >
      {data.map((o, i) => {
        if (!o) {
          return null;
        }
        const d = new Date(o.utcTime * 1000),
          weekday = o.weekday,
          day = d.getDate(),
          month = d.getMonth();

        const showDaySeparator = i && lastDay !== o.weekday;
        lastDay = o.weekday;
        return (
          <div
            key={i}
            data-testid="weather-daily-item"
            className={cx(s.dailyItem, { [s.daySeparator]: showDaySeparator })}
          >
            <h6>
              {weekday} {month}/{day}
            </h6>
            <div>{o.daySegment}</div>
            <div>
              <img alt={o.iconName} className={s.img_small} src={o.iconLink} />
            </div>
            <h4>
              <Temperature value={o.temperature} />
            </h4>
            <div>{o.temperatureDesc}</div>
          </div>
        );
      })}
    </AnimatedStack>
  );
};

const PrimaryConditions = ({ weather }) => (
  <aside className={s.primaryConditions}>
    <img alt={weather.now.iconName} className={s.img} src={weather.now.iconLink} />{" "}
    <Temperature value={weather.now.temperature} />
    <div className="small txt-right">
      <div>
        High <Temperature value={weather.now.highTemperature} /> /{" "}
        <Temperature value={weather.now.lowTemperature} />
      </div>
      <div>
        Humidity {weather.now.humidity}% / Dew Point{" "}
        <Temperature value={weather.now.dewPoint} units={false} />
        &deg;
      </div>
    </div>
  </aside>
);
const SecondaryConditions = ({ weather }) => {
  const sunrise = new Date(weather.astronomy.sunrise * 1000)
      .toLocaleTimeString()
      .replace(":00 ", " "),
    sunset = new Date(weather.astronomy.sunset * 1000).toLocaleTimeString().replace(":00 ", " ");
  return (
    <aside className={s.secondaryConditions}>
      <FaFlag className={s.flag} />
      {` ${weather.now.windDesc} `}
      <Speed value={weather.now.windSpeed} />
      <div className="small txt-right">
        <div>
          Sunrise: {sunrise} / Sunset: {sunset}
        </div>
        <div>
          Visibility <Distance value={weather.now.visibility} units={false} />
        </div>
      </div>
    </aside>
  );
};

const WeatherTab = ({ zip }) => {
  // metric = Config.metric;
  const weather = useWeather(zip);

  try {
    if (!weather.astronomy || !weather.forecast || !weather.hourly) {
      return null;
    }

    return (
      <main data-testid="weather-section">
        <h2>
          <Clock /> Weather for {weather.now.city}, {weather.now.state}
        </h2>
        <div>{weather.now.description}</div>
        <section className={s.conditions} data-testid="weather-conditions">
          <PrimaryConditions weather={weather} />
          <OnIdle>
            <SecondaryConditions weather={weather} />
          </OnIdle>
        </section>

        <h4>Hourly Forecast</h4>
        <OnIdle>
          <Hourly data={weather.hourly} />
        </OnIdle>

        <h5>7 Day Forecast</h5>
        <OnIdle>
          <Daily data={weather.forecast} />
        </OnIdle>
      </main>
    );
  } catch (e) {
    console.log("exception weather", e.message, e.stack, weather);
    return null;
  }
};

//
export default WeatherTab;
