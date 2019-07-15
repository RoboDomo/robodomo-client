const DAY_CONDITIONS = [
  ["Sunny. Hot.", "Sunny", "Hot", "Dry", "sunny", 1],
  ["Mostly sunny. Cool.", "Mostly sunny", "Cool", "Dry", "mostly_sunny", 2],
  ["Mostly sunny. Cool.", "Mostly sunny", "Cool", "Comfortable", "mostly_sunny", 3],
];

const NIGHT_CONDITIONS = [
  ["Clear. Mild.", "Clear", "Mild", "Comfortable", "night_clear", 16],
  ["Clear. Pleasantly warm.", "Clear", "Pleasantly warm", "Dry", "night_clear", 14],
];

const WIND = [
  ["South", "S"],
  ["South-East", "SE"],
  ["West", "W"],
  ["South-West", "SW"],
  ["East", "E"],
  ["North-East", "NE"],
  ["North", "N"],
  ["North-West", "NW"],
];

export { DAY_CONDITIONS, NIGHT_CONDITIONS, WIND };
