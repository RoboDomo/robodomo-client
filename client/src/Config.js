// Client configuration settings

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
  bowser: parser.getResult(),
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
  theaters: [
    {
      title: "Theater",
      key: "theater",
      guide: "CA68543",
      devices: [
        { name: "Harmony Hub", type: "harmony", device: "harmony-hub" },
        {
          name: "TiVo",
          type: "tivo",
          device: "tivo-bolt-3tb",
          guide: "CA68543"
        },
        { name: "LG TV", type: "lgtv", device: "olede6p" },
        { name: "AVR", type: "denon", device: "denon-s910w" },
        { name: "Apple TV", type: "appletv", device: "appletv-theater" }
      ],
      activities: [
        {
          name: "TV",
          defaultDevice: "TiVo",
          inputs: {
            tv: "hdmi1",
            avr: "TV"
          },
          script: [
            {
              text: "Turning on LG TV",
              topic: "lgtv/olede6p/set/command",
              message: "POWERON"
            },
            {
              text: "Setting TV Input to HDMI 1",
              topic: "lgtv/olede6p/set/commnad",
              message: "LAUNCH-com.webos.app.hdmi1"
            },
            {
              text: "Setting TiVo to Live TV",
              topic: "tivo/tivo-bolt-3tb/set",
              message: "LIVETV"
            },
            {
              text: "Turning on AVR",
              topic: "denon/denon-s910w/set/",
              message: "PWON"
            },
            {
              text: "Setting AVR to TV",
              topic: "denon/denon-s910w/set/",
              message: "SITV"
            }
          ]
        },
        {
          name: "Apple TV",
          defaultDevice: "Apple TV",
          inputs: {
            tv: "hdmi2",
            avr: "MPLAY"
          },
          script: [
            {
              text: "Turning on LG TV",
              topic: "lgtv/olede6p/set",
              message: "POWERON"
            },
            {
              text: "Setting LGTV Input to HDMI2",
              topic: "lgtv/olede6p/set/command",
              message: "LAUNCH-com.webos.app.hdmi2"
            },
            {
              text: "Turning on AVR",
              topic: "denon/denon-s910w/set/",
              message: "PWON"
            },
            {
              text: "Setting AVR Input to MPLAY",
              topic: "denon/denon-s910w/set/",
              message: "SIMPLAY"
            }
          ]
        },
        {
          name: "Roku",
          defaultDevice: "Harmony Hub",
          inputs: {
            tv: "hdmi4",
            avr: "TV"
          },
          script: [
            { topic: "lgtv/olede6p/set/power", message: "ON" },
            { topic: "lgtv/olede6p/set", message: "HDMI1" },
            { topic: "tivo/tivo-bolt-3tb", message: "LIVE TV" },
            { topic: "roku/roku4-theater/set", message: "SLEEP" }
          ]
        },
        {
          // XBox is only available with a harmony hub to control it!
          name: "XBox",
          defaultDevice: "Harmony Hub",
          inputs: {
            tv: "hdmi2",
            avr: "DVD"
          },
          script: [
            { topic: "lgtv/olede6p/set", message: "POWERON" },
            { topic: "lgtv/olede6p/set", message: "HDMI1" },
            { topic: "tivo/tivo-bolt-3tb", message: "LIVE TV" },
            { topic: "roku/roku4-theater/set", message: "SLEEP" }
          ]
        },
        {
          name: "All Off",
          defaultDevice: null,
          script: [{ topic: "lgtv/olede6p/set", message: "POWEROFF" }]
        }
      ],
      buttons: [
        {
          name: "Nest",
          type: "thermostat",
          device: "Falsetto/Hallway Thermostat",
          weather: "92211"
        },
        { type: "label", text: "Ceiling Fan" },
        { name: "Ceiling Fan", type: "fan", device: "Ceiling Fan" },
        { type: "label", text: "Ceiling Fan Light" },
        { name: "Light", type: "dimmer", device: "Ceiling Fan Light" },
        { type: "label", text: "Macros" },
        { name: "TV Break", type: "macro", device: "TV Break" },
        { name: "TV Resume", type: "macro", device: "TV Resume" },
        { name: "Bed Time", type: "macro", device: "Bed Time" }
      ]
    },
    {
      title: "MBR",
      key: "mbr",
      guide: "CA68543",
      devices: [
        { name: "TV", type: "bravia", device: "sony-850c" },
        { name: "Denon X2100W", type: "denon", device: "denon-x2100w" },
        { name: "TiVo", type: "tivo", device: "tivo-bolt", guide: "CA68543" },
        { name: "Apple TV", type: "appletv", device: "appletv-mbr" }
      ],
      activities: [
        {
          name: "Watch TV",
          default: "TiVo",
          script: [
            { topic: "lgtv/olede6p/set", message: "POWERON" },
            { topic: "lgtv/olede6p/set", message: "HDMI1" },
            { topic: "tivo/tivo-bolt-3tb", message: "LIVE TV" },
            { topic: "denon/denon-x2100w/set", message: "SLEEP" }
          ]
        },
        {
          name: "Watch Apple TV",
          default: "AppleTV",
          script: [
            { topic: "lgtv/olede6p/set", message: "POWERON" },
            { topic: "lgtv/olede6p/set", message: "HDMI1" },
            { topic: "tivo/tivo-bolt-3tb", message: "LIVE TV" },
            { topic: "roku/roku4-theater/set", message: "SLEEP" }
          ]
        },
        {
          name: "All Off",
          default: null,
          script: [{ topic: "lgtv/olede6p/set", message: "POWEROFF" }]
        }
      ],
      buttons: [
        { name: "Nest", type: "thermostat", device: "Hallway Thermostat" },
        { name: "Ceiling Fan", type: "fan", device: "Bedroom Fan" },
        { name: "Light", type: "dimmer", device: "Bedroom Fan Light" },
        { name: "Bathroom", type: "dimmer", device: "Bathroom Light" },
        { name: "Kitchen Light", type: "switch", device: "Kitchen Sink Light" },
        { name: "Good Night", type: "macro", device: "Good Night" },
        { name: "Good Morning", type: "macro", device: "Good Morning" }
      ]
    }
  ],
  dashboards: [
    {
      title: "Theater",
      key: "theater",
      tiles: [
        { type: "clock" },
        { type: "weather" },
        { type: "thermostat", device: "Falsetto/Hallway Thermostat" },
        { type: "pool", controller: "autelis" },
        { type: "spa", controller: "autelis" },
        {
          type: "theater",
          title: "Theater"
        },
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
        { type: "spa", controller: "autelis" },
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
  autelis: {
    device: "autelis",
    name: "Pool Control",
    location: "92211",
    // the forward and backward hash maps define the relationship between
    // Autelis device names and ones we want to use/display.
    // For example, on my pool hardware, autelis aux1 controls the spa jets;
    // we want to use "jets" in our logic, not aux1.
    // The wiring of your pool controls might be radically different.  Edit
    // these maps to match your configuration.
    //
    // TODO: make autelis-microservice do the mapping?
    deviceMap: {
      forward: {
        pump: "pump",
        spa: "spa",
        jet: "aux1",
        blower: "aux2",
        cleaner: "aux3",
        waterfall: "aux4",
        poolLight: "aux5",
        spaLight: "aux6",
        spaSetpoint: "spasp",
        poolSetpoint: "poolsp",
        spaHeat: "spaht",
        poolHeat: "poolht",
        poolTemp: "pooltemp",
        spaTemp: "spatemp",
        solarHeat: "solarht",
        solarTemp: "solartemp"
      },
      backward: {
        pump: "pump",
        spa: "spa",
        aux1: "jet",
        aux2: "blower",
        aux3: "cleaner",
        aux4: "waterfall",
        aux5: "poolLight",
        aux6: "spaLight",
        spasp: "spaSetpoint",
        poolsp: "poolSetpoint",
        pooltemp: "poolTemp",
        spatemp: "spaTemp",
        spaht: "spaHeat",
        poolht: "poolHeat",
        solartemp: "solarTemp",
        solarht: "solarHeat"
      }
    }
  },
  //  autelis: require("autelis-microservice/config").autelis,
  nest: {
    thermostats: [
      { device: "Falsetto/Hallway Thermostat", name: "Hallway Thermostat" }
    ],
    protects: [
      {
        device: "Falsetto/Entryway Nest Protect",
        name: "Entryway"
      }
    ]
  },
  sensors: [
    {
      name: "Back Office Multisensor",
      topic: "smartthings/Back Office Multisensor/battery",
      type: "battery"
    },
    {
      name: "Back Office Multisensor",
      topic: "smartthings/Back Office Multisensor/humidity",
      type: "humidity"
    },
    {
      name: "Back Office Multisensor",
      topic: "smartthings/Back Office Multisensor/illuminance",
      type: "illuminance"
    },
    {
      name: "Back Office Multisensor",
      topic: "smartthings/Back Office Multisensor/motion",
      type: "motion"
    },
    {
      name: "Back Office Multisensor",
      topic: "smartthings/Back Office Multisensor/temperature",
      type: "temperature"
    },
    {
      name: "Bathroom Sensor",
      topic: "smartthings/Bathroom Sensor/motion",
      type: "motion"
    },
    {
      name: "Bathroom Sensor",
      topic: "smartthings/Bathroom Sensor/battery",
      type: "battery"
    },
    {
      name: "Cart Door Sensor",
      topic: "smartthings/Cart Door Sensor/contact",
      type: "contact"
    },
    {
      name: "Garage Door Sensor",
      topic: "smartthings/Garage Door Sensor/contact",
      type: "contact"
    },
    {
      name: "Sliding Door",
      topic: "smartthings/Sliding Door/contact",
      type: "contact"
    },
    {
      name: "Sliding Door",
      topic: "smartthings/Sliding Door/temperature",
      type: "temperature"
    },
    {
      name: "Front Door",
      topic: "smartthings/Front Door/motion",
      type: "motion"
    },
    {
      name: "Front Door",
      topic: "smartthings/Front Door/battery",
      type: "battery"
    },
    {
      name: "Thermostat",
      topic: "nest/Falsetto/Hallway Thermostat/status/ambient_temperature_f",
      type: "temperature"
    },
    {
      name: "Thermostat",
      topic: "nest/Falsetto/Hallway Thermostat/status/humidity",
      type: "humidity"
    },
    {
      name: "MBR Sensor",
      topic: "smartthings/MBR Sensor/battery",
      type: "battery"
    },
    {
      name: "MBR Sensor",
      topic: "smartthings/MBR Sensor/contact",
      type: "contact"
    },
    {
      name: "MBR Sensor",
      topic: "smartthings/MBR Sensor/temperature",
      type: "temperature"
    }
  ],
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
