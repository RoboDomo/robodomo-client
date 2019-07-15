import React from "react";
import { format, parseISO } from "date-fns";

import Clock from "@/common/Clock";
import useConfig from "@/hooks/useConfig";
import useWeather from "@/hooks/useWeather";
import Temperature from "@/common/Temperature";
import Speed from "@/common/Speed";
import Distance from "@/common/Distance";

import { FaFlag } from "react-icons/fa";

const styles = {
  img: {
    verticalAlign: "bottom",
    width: 64,
    height: 64,
    // float:         'left'
  },
  img_small: {
    verticalAlign: "bottom",
    width: 48,
    height: 48,
    //    float: "left",
  },
  imgleft: {
    verticalAlign: "middle",
    width: 48,
    height: 48,
    // float:         'left'
  },
};

const WeatherTab = ({ location }) => {
  const Config = useConfig(),
    metric = Config.metric;
  const weather = useWeather(location.device);

  const renderHourly = hourly => {
    return (
      <div
        onScroll={e => e.stopPropagation()}
        style={{
          position: "relative",
          height: 120,
          width: "100%",
          textAlign: "left",
          whiteSpace: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {hourly.map((data, i) => {
          if (data.localTime === undefined) {
            return null;
          }
          const localTime = format(parseISO(data.localTime), "h:mm aa");
          return (
            <div
              key={i}
              style={{
                width: 100,
                height: 100,
                display: "inline-block",
                marginRight: 2,
                padding: 2,
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12 }}>{localTime}</div>
              <img
                style={styles.img_small}
                alt={data.skyDescription}
                title={data.description}
                src={data.iconLink}
              />
              <div style={{ fontWeight: "bold", fontSize: 20 }}>
                <Temperature value={data.temperature} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDaily = daily => {
    let lastDay = "";
    return (
      <div
        onScroll={e => e.stopPropagation()}
        style={{
          position: "relative",
          height: 180,
          width: "100%",
          textAlign: "left",
          whiteSpace: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {daily.map((o, i) => {
          if (!o) {
            return null;
          }
          const d = new Date(o.utcTime * 1000),
            weekday = o.weekday,
            day = d.getDate(),
            month = d.getMonth(),
            header = (
              <div style={{ fontSize: 14, fontWeight: "bold" }}>
                {weekday} {month}/{day}
              </div>
            );

          const marginLeft = i && lastDay !== o.weekday ? 20 : 0;
          lastDay = o.weekday;
          return (
            <div
              key={i}
              style={{
                marginLeft: marginLeft,
                width: 140,
                height: 160,
                display: "inline-block",
                marginRight: 2,
                padding: 2,
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {header}
              <div>{o.daySegment}</div>
              <div>
                <img alt={o.iconName} style={styles.img_small} src={o.iconLink} />
              </div>
              <div style={{ fontWeight: "bold", fontSize: 20 }}>
                <Temperature value={o.temperature} />
              </div>
              <div>{o.temperatureDesc}</div>
            </div>
          );
        })}
      </div>
    );
  };

  try {
    if (!weather.astronomy || !weather.forecast || !weather.hourly) {
      return null;
    }
    const header = (
        <>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>
            <Clock /> Weather for {weather.now.city}, {weather.now.state}
          </div>
          <div>{weather.now.description}</div>
        </>
      ),
      sunrise = new Date(weather.astronomy.sunrise * 1000)
        .toLocaleTimeString()
        .replace(":00 ", " "),
      sunset = new Date(weather.astronomy.sunset * 1000).toLocaleTimeString().replace(":00 ", " ");

    return (
      <div style={{ padding: 5 }}>
        {header}
        <div
          style={{
            fontSize: 30,
            float: "right",
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <div>
            <FaFlag style={{ fontSize: 40 }} /> {weather.now.windDesc}{" "}
            <Speed value={weather.now.windSpeed} />
          </div>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            Sunrise: {sunrise} / Sunset: {sunset}
          </div>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            Visibility <Distance value={weather.now.visibility} units={false} />
          </div>
        </div>
        <div style={{ fontSize: 40, float: "left" }}>
          <span style={{ paddingTop: 10, fontSize: 48 }}>
            <img alt={weather.now.iconName} style={styles.img} src={weather.now.iconLink} />{" "}
            <Temperature value={weather.now.temperature} />
          </span>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            High <Temperature value={weather.now.highTemperature} /> /{" "}
            <Temperature value={weather.now.lowTemperature} />
          </div>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            Humidity {weather.now.humidity}% / Dew Point{" "}
            <Temperature value={weather.now.dewPoint} units={false} />
            &deg;
          </div>
        </div>
        <div style={{ clear: "both", marginBottom: 10 }} />
        <h4>Hourly Forecast</h4>
        {renderHourly(weather.hourly)}
        <h5 style={{ marginTop: 2 }}>7 Day Forecast</h5>
        {renderDaily(weather.forecast)}
      </div>
    );
  } catch (e) {
    console.log("exception weather", e.message, e.stack, weather);
    //    console.log("Weather render exception", e.message, e.stack);
    return null;
  }
};

//
export default WeatherTab;
