import { randomTemp, randomPositive, randomItem } from "../utils";
import { DAY_CONDITIONS, NIGHT_CONDITIONS, WIND } from "./common";
import { addHours, subMinutes } from "date-fns";

const getHourly = () => {
  const now = Date.now();
  return Array.from(Array(24), (_, idx) => {
    const time = addHours(now, 1);
    const utcTime = subMinutes(time, -1 * time.getTimezoneOffset());
    const localTime = subMinutes(utcTime, 5 * 60 - 1 - idx * 60);
    const isNight = localTime.getHours() >= 20 || localTime.getHours() < 7;

    const CONDITIONS = randomItem(isNight ? NIGHT_CONDITIONS : DAY_CONDITIONS);
    const [
      description,
      skyDescription,
      temperatureDesc,
      airDescription,
      iconName,
      icon,
    ] = CONDITIONS;

    const [windDesc, windDescShort] = randomItem(WIND);

    return {
      daylight: isNight ? "N" : "D",
      description,
      skyInfo: randomPositive(3),
      skyDescription,
      temperature: randomTemp(),
      temperatureDesc,
      comfort: randomTemp(),
      humidity: randomPositive(100),
      dewPoint: randomPositive(100),
      precipitationProbability: randomPositive(100),
      precipitationDesc: "",
      rainFall: "*",
      snowFall: "*",
      airInfo: "28",
      airDescription,
      windSpeed: randomPositive(20),
      windDirection: randomPositive(360),
      windDesc,
      windDescShort,
      visibility: randomPositive(40),
      icon,
      iconName,
      iconLink: `https://weather.cit.api.here.com/static/weather/icon/${icon}.png`,
      dayOfWeek: 2,
      weekday: "Monday",
      utcTime,
      localTime,
      localTimeFormat: "HHMMddyyyy",
    };
  });
};

export { getHourly };
