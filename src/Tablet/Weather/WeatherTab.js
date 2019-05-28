import React from "react";

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
    float: "left",
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
        {hourly.map((o, i) => {
          const d = new Date(o.time * 1000).toLocaleTimeString().replace(":00 ", " ");

          if (i < 0 || i > 23) {
            return null;
          }
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
              <div style={{ fontSize: 16, fontWeight: "bold" }}>{d}</div>
              <div style={{ textAlign: "center", fontSize: 24 }}>{o.temp}&deg;</div>
              <div style={{ fontSize: "smaller" }}>Humidity: {o.humidity}%</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDaily = daily => {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        {daily.map((o, i) => {
          if (!o) {
            return null;
          }
          const d = new Date(o.date * 1000),
            weekday = dayOfWeek[d.getDay()],
            day = d.getDate(),
            month = d.getMonth(),
            header = (
              <div style={{ fontWeight: "bold" }}>
                {weekday} {month}/{day}
              </div>
            );

          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: 180,
                margin: 2,
                padding: 5,
                border: "1px solid black",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              {header}
              <img alt={o.icon} style={styles.img} src={`/img/Weather/icons/black/${o.icon}.svg`} />
              <div>{o.conditions}</div>
              <div>High: {o.high_temperature} &deg;F</div>
              <div>Low: {o.low_temperature} &deg;F</div>
            </div>
          );
        })}
      </div>
    );
  };

  //  const [forecast, setForecast] = useState({});
  //  const [now, setNow] = useState({});
  //  const [display_city, setDisplayCity] = useState("");

  //  useEffect(() => {
  //    const onStateChange = (topic, newState) => {
  //      const key = topic.substr(status_topic_length);
  //      switch (key) {
  //        case "forecast":
  //          setForecast(newState);
  //          break;
  //        case "now":
  //          setNow(newState);
  //          break;
  //        case "display_city":
  //          setDisplayCity(newState);
  //          break;
  //        default:
  //          throw new Error("invalid case", key);
  //      }
  //    };
  //    MQTT.subscribe(status_topic + "forecast", onStateChange);
  //    MQTT.subscribe(status_topic + "now", onStateChange);
  //    MQTT.subscribe(status_topic + "display_city", onStateChange);
  //    return () => {
  //      MQTT.unsubscribe(status_topic + "forecast", onStateChange);
  //      MQTT.unsubscribe(status_topic + "now", onStateChange);
  //      MQTT.unsubscribe(status_topic + "display_city", onStateChange);
  //    };
  //  }, []);

  try {
    const header = (
        <div style={{ fontSize: 24, fontWeight: "bold" }}>{weather.display_city} Weather</div>
      ),
      daily = weather.forecast.daily || [],
      //      hourly = forecast.hourly,
      sunrise = new Date(weather.now.sunrise * 1000).toLocaleTimeString().replace(":00 ", " "),
      sunset = new Date(weather.now.sunset * 1000).toLocaleTimeString().replace(":00 ", " ");

    if (!daily[0]) {
      return null;
    }
    return (
      <div style={{ padding: 5 }}>
        {header}
        <h4>Current Conditions</h4>
        <div
          style={{
            fontSize: 30,
            float: "right",
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <div>
            <FaFlag style={{ fontSize: 24 }} /> {weather.now.wind_direction}{" "}
            {weather.now.current_wind} MPH
          </div>
          <div style={{ fontSize: 14, textAlign: "right" }}>
            Sunrise: {sunrise} / Sunset: {sunset}
          </div>
        </div>
        <div style={{ fontSize: 30, float: "left", marginBottom: 10 }}>
          <img
            alt={weather.now.icon}
            style={styles.img}
            src={`/img/Weather/icons/black/${weather.now.icon}.svg`}
          />
          {weather.now.current_temperature}&deg;F
          <div style={{ fontSize: 14, textAlign: "right" }}>
            High: {daily[0].high_temperature}&deg; / Low: {daily[0].low_temperature}&deg;
          </div>
        </div>
        <div style={{ clear: "both" }} />

        <h4>Hourly Forecast</h4>
        {renderHourly(weather.forecast.hourly)}
        <h5 style={{ marginTop: 2 }}>5 Day Forecast</h5>
        {renderDaily(daily)}
      </div>
    );
  } catch (e) {
    console.log("weather", weather);
    //    console.log("Weather render exception", e.message, e.stack);
    return null;
  }
};
export default WeatherTab;
