import { randomTemp, randomPositive } from "../utils";

const getObservation = () => ({
  daylight: "D",
  description: "Mostly cloudy. Mild.",
  skyInfo: randomPositive(30),
  skyDescription: "Mostly cloudy",
  temperature: randomTemp(),
  temperatureDesc: "Mild",
  comfort: randomPositive(100),
  highTemperature: randomTemp(),
  lowTemperature: randomTemp(),
  humidity: randomPositive(100),
  dewPoint: randomPositive(100),
  precipitation1H: "*",
  precipitation3H: "*",
  precipitation6H: "*",
  precipitation12H: "*",
  precipitation24H: "*",
  precipitationDesc: "",
  airInfo: "*",
  airDescription: "",
  windSpeed: randomPositive(34),
  windDirection: randomPositive(360),
  windDesc: "West",
  windDescShort: "W",
  barometerPressure: randomPositive(40),
  barometerTrend: "",
  visibility: randomPositive(20),
  snowCover: "*",
  icon: "6",
  iconName: "mostly_cloudy",
  iconLink: "https://weather.api.here.com/static/weather/icon/17.png",
  ageMinutes: 24,
  activeAlerts: false,
  country: "United States",
  state: "NY",
  city: "New York City",
  latitude: 32.7915,
  longitude: -117.2369,
  distance: 5.02,
  elevation: 0,
  utcTime: 1561405260,
  sunrise: 1561380120.848,
  sunset: 1561431600.849,
});

export { getObservation };
