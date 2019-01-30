// Client configuration settings

//import DashboardScreen from "./webapp/screens/DashboadScreen";
//import ThingsScreen from "./webapp/screens/ThingsScreen";
//import ThermostatScreen from "./webapp/screens/ThermostatScreen";
//import AutelisScreen from "./webapp/screens/AutelisScreen";
//import WeatherScreen from "./webapp/screens/WeatherScreen";
//import TiVoScreen from "./webapp/screens/TiVoScreen";
//import LGTVScreen from "./webapp/screens/LGTVScreen";
//import BraviaScreen from "./webapp/screens/BraviaScreen";
//import DenonScreen from "./webapp/screens/DenonScreen";
//import HarmonyScreen from "./webapp/screens/HarmonyScreen";
//import NotFoundScreen from "./webapp/screens/NotFoundScreen";

const lgtvFavorites = [
  "amazon",
  "hulu",
  "netflix",
  "vudu",
  "youtube",
  "hdmi1",
  "hdmi2",
  "hdmi3",
  "hdmi4"
];

// lowercase these
// if one of the TV's apps contains these strings, it becomes a favorite
const braviaFavorites = [
  "netflix",
  "amazon",
  "hulu",
  "youtube",
  "cnn",
  "starz",
  "hbo go",
  "epix",
  "showtime anytime",
  "fox news",
  "cbs"
];

const bowser = require("bowser"),
  parser = bowser.getParser(window.navigator.userAgent);
console.dir(parser.getResult());
const screenSize = (function() {
  if (bowser.ipad) {
    return "normal";
  } else if (window.innerWidth <= 601) {
    return "small";
  } else if (window.innerWidth >= 1024) {
    return "normal";
  }
  return bowser.mobile ? "small" : "normal";
})();

export default {
  name: "RoboDomo Home Automation System",
  version: "1.0.0",
  location: "RoboDomo",
  mqtt: {
    // host is the host running mqtt server
    host: "ha",
    // port is the port on the mqtt server for websocket connection
    // you would configure this for mosquitto, for example, in mosquitto.conf
    // between host and port, we're looking at something like mqtt://ha:80
    port: 80,
    denon: "denon",
    nest: "nest",
    weather: "weather",
    autelis: "autelis",
    tvguide: "tvguide",
    harmony: "harmony",
    tivo: "tivo",
    bravia: "bravia",
    lgtv: "lgtv",
    smartthings: "smartthings",
    macros: "macros"
  },
  screenSize: screenSize,
  ui: {
    panelType: "primary",
    subPanelType: "default",
    bsSize: screenSize === "small" ? "small" : "large",
    // these two add up to 12
    labelCol: screenSize === "small" ? 3 : 4,
    fieldCol: screenSize === "small" ? 9 : 8,
    // style for remote buttons, denon buttons, etc.
    buttonStyle:
      screenSize === "small" &&
      window.innerWidth < 600 &&
      window.innerHeight < 600
        ? {
            width: 56,
            height: 30
          }
        : {
            width: 100,
            height: 40
          },
    buttonSize: screenSize === "small" ? "small" : null,
    controlButtonStyle: {
      width: 100,
      height: 40
    },
    miniButtonStyle:
      screenSize === "small" &&
      window.innerWidth < 600 &&
      window.innerHeight < 600
        ? {
            width: 30,
            height: 30
          }
        : {
            width: 50,
            height: 40
          },
    controlSpace: 20
  },
  dashboards: [
    {
      title: "Theater",
      key: "theater",
      tiles: [
        { type: "clock" },
        { type: "weather" },
        { type: "thermostat", device: "Falsetto/Hallway Thermostat" },
        { type: "pool" },
        { type: "spa" },
        //        {
        //          type: "theater",
        //          denon: "denon-s910w",
        //          tv: "olede6p",
        //          settop: "hdmi1",
        //          tivo: "tivo-bolt-3tb"
        //        },
        {
          type: "garagedoor",
          title: "Garage Doors",
          devices: ["Garage Door Sensor", "Cart Door Sensor"]
        },
        { device: "Ceiling Fan", type: "fan" },
        { device: "Ceiling Fan Light", type: "dimmer" },
        { device: "Kitchen Sink Light", type: "switch" },
        { device: "Kitchen Lights", type: "dimmer" },
        { device: "Porch Light", type: "switch" },
        { device: "Outside Light", type: "switch" },
        { device: "Bathroom Light", type: "dimmer" },
        { type: "macro", name: "TV Mood", label: "TV Mood" },
        { type: "macro", name: "TV Break", label: "TV Break" },
        { type: "macro", name: "TV Resume", label: "TV Resume" },
        //          {type: 'macro', name: 'Theater On', label: 'Theater On'},
        //          {type: 'macro', name: 'Theater Off', label: 'Theater Off'},
        { type: "macro", name: "Bedtime", label: "Bedtime" }
      ]
    },
    {
      title: "MBR",
      key: "mbr",
      tiles: [
        { type: "clock" },
        { type: "thermostat", device: "Falsetto/Hallway Thermostat" },
        { type: "weather" },
        { type: "spa" },
        {
          type: "garagedoor",
          title: "Garage Doors",
          devices: ["Garage Door Sensor", "Cart Door Sensor"]
        },
        { device: "Bathroom Light", type: "dimmer" },
        { device: "Bedroom Fan", type: "fan" },
        { device: "Bedroom Lamp", type: "switch" },
        { device: "Bedroom Light", type: "dimmer" },
        { device: "Kitchen Sink Light", type: "switch" },
        { device: "Kitchen Lights", type: "dimmer" },
        { device: "Entryway Lights", type: "switch" },
        { type: "macro", name: "Good Night", label: "Good Night" },
        { type: "macro", name: "Good Morning", label: "Good Morning" }
      ]
    },
    {
      title: "Office",
      key: "office",
      tiles: [
        { type: "clock" },
        { type: "thermostat", device: "Falsetto/Hallway Thermostat" },
        { type: "weather" },
        {
          type: "garagedoor",
          title: "Garage Doors",
          devices: ["Garage Door Sensor", "Cart Door Sensor"]
        },
        { device: "Office Dimmer", type: "dimmer" },
        { device: "Office Fan", type: "fan" },
        { device: "Office Light", type: "dimmer" },
        { device: "Back Room Light", type: "dimmer" },
        { device: "Back Room Fan", type: "fan" },
        { device: "Back Room Switch", type: "switch" }
        //              {device: 'Kitchen Lights', type: 'dimmer'},
        //              {device: 'Porch Light', type: 'switch'},
        //              {device: 'Outside Light', type: 'switch'},
        //              {device: 'Bathroom Light', type: 'dimmer'},
        //          {type: 'macro', name: 'Theater On', label: 'Theater On'},
        //          {type: 'macro', name: 'Theater Off', label: 'Theater Off'},
      ]
    },
    {
      title: "Macros",
      key: "macros",
      tiles: [
        { type: "macro", name: "Bedroom On", label: "Bedroom On" },
        { type: "macro", name: "Bedroom Off", label: "Bedroom Off" },
        { type: "macro", name: "Office On", label: "Office On" },
        { type: "macro", name: "Office Off", label: "Office Off" },
        { type: "macro", name: "Warm Spa", label: "Warm Spa" },
        { type: "macro", name: "Enter Spa", label: "Enter Spa" },
        { type: "macro", name: "Exit Spa", label: "Exit Spa" },
        { type: "macro", name: "Spa Off", label: "Spa Off" }
      ]
    }
  ],
  weather: {
    locations: [
      { name: "Palm Desert CA", device: "92211" },
      { name: "Mission Beach CA", device: "92109" }
    ]
  },
  //  autelis: require("autelis-microservice/config").autelis,
  nest: {
    thermostats: [
      { device: "Falsetto/Hallway Thermostat", name: "Hallway Thermostat" }
    ]
  },
  smartthings: {
    device: "smartthings",
    name: "SmartThings Hub",
    things: [
      { name: "Ceiling Fan Light", type: "dimmer", rooms: ["Theater"] },
      { name: "Ceiling Fan", type: "fan", rooms: ["Theater"] },
      {
        name: "Office Dimmer",
        type: "dimmer",
        rooms: ["Theater", "Office", "Back Room"]
      },
      {
        name: "Office Light",
        type: "dimmer",
        rooms: ["Theater", "Office", "Back Room"]
      },
      {
        name: "Office Fan",
        type: "fan",
        rooms: ["Theater", "Office", "Back Room"]
      },
      {
        name: "Back Room Light",
        type: "dimmer",
        rooms: ["Theater", "Office", "Back Room"]
      },
      {
        name: "Back Room Fan",
        type: "fan",
        rooms: ["Theater", "Office", "Back Room"]
      },
      {
        name: "Back Room Switch",
        type: "switch",
        rooms: ["Theater", "Office", "Back Room"]
      },
      {
        name: "Entryway Lights",
        type: "switch",
        rooms: ["Theater", "Office", "Back Room", "Bedroom"]
      },
      {
        name: "Kitchen Lights",
        type: "dimmer",
        rooms: ["Kitchen", "Theater", "Bedroom"]
      },
      {
        name: "Bathroom Light",
        type: "dimmer",
        rooms: ["Bathroom", "Bedroom"]
      },
      {
        name: "Bathroom Sensor",
        type: "motion",
        rooms: ["Bathroom", "Bedroom"]
      },
      { name: "Bedroom Lamp", type: "switch", rooms: ["Bedroom"] },
      { name: "Bedroom Fan", type: "fan", rooms: ["Bedroom"] },
      { name: "Bedroom Light", type: "dimmer", rooms: ["Bedroom"] },
      { name: "Goodnight Button", type: "button", rooms: ["Bedroom"] },
      { name: "Nest Presence Device", type: "presence", rooms: ["*"] },
      { name: "Michael's iPhone", type: "presence", rooms: ["*"] },
      { name: "Porch Light", type: "switch", rooms: ["Outside"] },
      { name: "Outside Light", type: "switch", rooms: ["Outside"] },
      { name: "Outdoor Lights", type: "switch", rooms: ["Outside"] },
      {
        name: "Front Door",
        type: "Motion",
        rooms: ["Theater", "Bedroom", "Outside"]
      },
      {
        name: "Front Door",
        type: "Motion",
        rooms: ["Theater", "Bedroom", "Outside"]
      },
      { name: "Slider", type: "Acceleration", rooms: ["*"] },
      { name: "Slider", type: "Temperature", rooms: ["*"] },
      { name: "Slider", type: "threeAxis", rooms: ["*"] },
      { name: "Slider", type: "contact", rooms: ["*"] },
      { name: "Bathroom Sensor", type: "motion", rooms: ["*"] }
    ]
  },
  tvguide: {
    guides: [{ device: "CA68543", name: "Frontier FIOS Palm Desert" }]
  },
  tivo: {
    guide: "CA68543",
    boxes: [
      // device may optionally have a denon receiver device and a guide
      // if guide not provided, the global one for tivo (above) is used
      {
        device: "tivo-bolt-3tb",
        name: "Theater TiVo",
        denon: "denon-s910w",
        guide: "CA68543"
      },
      {
        device: "tivo-bolt",
        name: "TiVo Bolt",
        denon: "denon-x2100w",
        guide: "CA68543"
      },
      { device: "tivo-office2", name: "Mini Back Office", guide: "CA68543" },
      { device: "tivo-office", name: "Mini Office", guide: "CA68543" },
      { device: "tivo-guest", name: "Mini Guest Room", guide: "CA68543" }
    ]
  },
  tivoFavorites: [
    { name: "CNN", channel: "0600" },
    { name: "MSNBC", channel: "0603" },
    { name: "FOX NEWS", channel: "0618" },
    { name: "HGTV", channel: "0665" },
    { name: "CBS", channel: "0502" },
    { name: "ABC", channel: "0503" },
    { name: "NBC", channel: "0507" },
    { name: "FOX", channel: "0508" },
    { name: "PBS", channel: "0528" },
    { name: "COOKING", channel: "0663" },
    { name: "FOOD", channel: "0664" }
  ],
  denon: {
    receivers: [
      { name: "Family Room Receiver", device: "denon-s910w" },
      { name: "Master Bed Room Receiver", device: "denon-x2100w" }
    ]
  },
  lgtv: {
    tvs: [
      {
        name: "Family Room TV",
        device: "olede6p",
        denon: "denon-s910w",
        favorites: lgtvFavorites
      }
    ]
  },
  bravia: {
    tvs: [
      { name: "MBR TV", device: "sony-850c", favorites: braviaFavorites },
      { name: "Office TV", device: "sony-810c", favorites: braviaFavorites }
    ]
  },
  harmony: {
    hubs: [
      {
        name: "Family Room",
        device: "harmony-hub",
        denon: "denon-s910w",
        buttons: [
          {
            type: "thermostat",
            text: "Nest",
            name: "Falsetto/Hallway Thermostat"
          },
          { type: "fan", text: "Ceiling Fan", name: "Ceiling Fan" },
          { type: "dimmer", text: "Light", name: "Ceiling Fan Light" },
          {
            type: "mqtt",
            text: "TV Break",
            topic: "macros/run",
            message: "TV Break"
          },
          {
            type: "mqtt",
            text: "TV Resume",
            topic: "macros/run",
            message: "TV Resume"
          },
          {
            type: "mqtt",
            text: "Bedtime",
            topic: "macros/run",
            message: "Bedtime"
          }
        ]
      }
      //      {name: 'Master Bedroom', device: 'harmony-hub2'},
    ]
  }
};
