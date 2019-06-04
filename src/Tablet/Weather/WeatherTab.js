import React from "react";

import Clock from "common/Clock";

import { FaFlag } from "react-icons/fa";

import useWeather from "common/hooks/useWeather";

const styles = {
  img: {
    verticalAlign: "middle",
    width: 64,
    height: 64,
    // float:         'left'
  },
  img_small: {
    verticalAlign: "middle",
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

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeatherTab = ({ location }) => {
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
        {weather.hourly.map((data, i) => {
          if (data.localTime === undefined) {
            return null;
          }
          const t = "" + data.localTime,
            timeStamp = parseInt(t.substr(0, t.length - 8), 10),
            localTime =
              timeStamp === 12
                ? `12:00 PM`
                : timeStamp > 12
                ? `${timeStamp - 12}:00 PM`
                : `${timeStamp}:00 AM`;
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
              <img style={styles.img_small} alt={data.iconName} src={data.iconLink} />
              <div style={{ fontWeight: "bold", fontSize: 20 }}>{data.temperature}&deg;F</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDaily = daily => {
    console.log("daily", daily);
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
              <div style={{ fontWeight: "bold", fontSize: 20 }}>{o.temperature}&deg;F</div>
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
            Weather for {weather.now.city}, {weather.now.state}
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
            <FaFlag style={{ fontSize: 40 }} /> {weather.now.windDesc} {weather.now.windSpeed} MPH
          </div>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            Sunrise: {sunrise} / Sunset: {sunset}
          </div>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            Visibility {weather.now.visibility}
          </div>
        </div>
        <div style={{ fontSize: 40, float: "left" }}>
          <img alt={weather.now.iconName} style={styles.img} src={weather.now.iconLink} />
          <span style={{ paddingTop: 10, fontSize: 48 }}>{weather.now.temperature}&deg;F</span>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            High {weather.now.highTemperature}&deg; / Low: {weather.now.lowTemperature}&deg;
          </div>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            Humidity {weather.now.humidity}% / Dew Point {weather.now.dewPoint}&deg;
          </div>
        </div>
        <div style={{ clear: "both", marginBottom: 10 }} />
        <h4>
          Hourly Forecast <Clock />
        </h4>
        {renderHourly(weather.forecast.hourly)}
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
