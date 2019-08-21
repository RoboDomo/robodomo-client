// mschwartz touched this to cause a changed file for comments

/**
 * DEMO configuration file for RoboDomo.
 */

// These are favorite apps for LG TVs
// lowercase these
// if one of the TV's apps contains these strings, it becomes a favorite
const lgtvFavorites = [
  "amazon",
  "hulu",
  "netflix",
  "vudu",
  "youtube",
  "hdmi1",
  "hdmi2",
  "hdmi3",
  "hdmi4",
];

// These are favorite apps for Sony TVs (Bravia)
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
  "cbs",
];

// favorite channels for TiVo
const tivoFavorites = [
  { name: "COOKING", channel: "0663" },
  { name: "FOOD", channel: "0664" },
  { name: "ESPN", channel: "0695" },
];

module.exports = {
  name: "RoboDomo Home Automation System",
  version: "1.0.0",

  // MQTT configuration
  mqtt: {
    // host is the host running mqtt broker/server
    host: process.env.REACT_APP_SERVER_DOMAIN || "robodomo",
    // port is the port on the mqtt server for websocket connection
    // you would configure this for mosquitto, for example, in mosquitto.conf
    // between host and port, we're looking at something like mqtt://robodomo:80
    port: process.env.REACT_APP_SERVER_PORT || 80,
    // topics - roughly one per microservice
    appletv: "appletv",
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
    macros: "macros",
  },
  // Home Theater Definitions
  // This is an array of objects that describe your theaters.  You might have a theater where you mainly watch TV,
  // another in your home office, another in your bedroom, another in a second bedroom, etc.  RoboDomo can control
  // them all.
  //
  // If you have no theaters defined, then the client will not show UI for theaters.
  //
  // If you define one or more theaters, each will have its own tab in the UI when the theater display is selected.
  theaters: [
    {
      title: "Home Theater", // name of theater
      key: "theater", // a unique key (used as key param in tabs)
      // if you want TV channel info and network logos, you will need to subscribe ($25US/year) at
      // http://schedulesdirect.com and get the appropriate guide id for your cable TV provider.
      guide: "SchedulesDirect GUIDE ID",
      // your theater(s) have at least one device, the TV itself.  However, you may have an AVR (for audio), a game
      // console, harmony remote and hub, apple tv, etc.  This array defines these:
      devices: [
        {
          // example config for an Apple TV
          name: "Apple TV", // name to be displayed in the UI
          type: "appletv", // type = appletv
          device: "appletv-theater", // hostname or IP address of your Apple TV
        },
        {
          // example config for a Denon AVR (audio visual receiver)
          name: "AVR", // name to be displayed in the UI
          type: "denon", // type = denon
          device: "denon-avr", // hostname or IP address of your Denon AVR
        },
        // Your theater has a TV.  Currently, RoboDomo supports LG and Sony/Bravia TVs.
        {
          name: "TVSONY", // name to be displayed in the UI
          type: "bravia",
          favorites: braviaFavorites, // favorite apps to display in the UI
          device: "sony-tv", // hostname or IP of your Sony/Bravia TV
        },
      ],
      // Your theater can have one or more activities associated with it.
      // For example, your Watch TV activity might launch by:
      // * turning on the TV
      // * set the TV input to HDMI1
      // * turn on the AVR
      // * switch the AVR input to CBL/SAT
      // * wake up the TiVo
      //
      // RoboDomo theater tabs detect what activity is running by what input the TV and AVR are set to.
      activities: [
        {
          name: "TV", // name of activity to be displayed in teh UI
          defaultDevice: "AVR", // this is the device control that will be displayed in the UI by default for this activity
          // The inputs for this activity... if tv is hdmi1 and avr is TV, then RoboDomo knows your watching TV.
          inputs: {
            tv: "hdmi1",
            avr: "TV",
          },
          // To launch your activity, the following script is executed.
          // It does take a bit of knowledge about how the MQTT commands work:
          // topic: name_of_service/device/set/whatever
          // message: the command
          script: [
            // set harmony activity to Watch TV so your remote works
            {
              text: "Starting Harmony Activity", // displayed in the UI while the message is sent
              topic: "harmony/harmony-hub/set/activity", // the topic
              message: "35943301", // using the dev tools and using your remote, you can determine hte activity number
            },
            // turn on the TV
            {
              text: "Turning on LG TV",
              topic: "lgtv/lgtv/set/command",
              message: "POWERON",
            },
            // set TV to hdmi1
            {
              text: "Setting TV Input to HDMI 1",
              topic: "lgtv/lgtv/set/commnad",
              message: "LAUNCH-com.webos.app.hdmi1",
            },
            // wake TiVo and set it to live tv
            {
              text: "Setting TiVo to Live TV",
              topic: "tivo/tivo-bolt-3tb/set",
              message: "LIVETV",
            },
            // turn on Denon AVR
            {
              text: "Turning on AVR",
              topic: "denon/denon-avr/set",
              message: "PWON",
            },
            // set AVR input to TV
            {
              text: "Setting AVR to TV",
              topic: "denon/denon-avr/set",
              message: "SITV",
            },
          ],
        },
        // all off - turn off your theater devices
        {
          name: "All Off",
          defaultDevice: null,
          script: [
            { topic: "lgtv/lgtv/set", message: "POWEROFF" },
            { topic: "denon/denon-avr/set", message: "PWOFF" },
          ],
        },
      ],
      // RoboDomo's client tries to display the handiest controls you use while controlling your theater.
      // You can add buttons to the right column to control things other than the theater devices.
      // For example, you might want to be able to adjust the thermostat while sitting on your couch and
      // controlling your theater
      buttons: [
        // Nest Thermostat button (shows weather and thermostat controls)
        {
          name: "Nest", // name of button
          type: "thermostat", // type of button
          device: "structure/thermostat_name", // structure and name of thermostat
          weather: "92109", // the zip code for weather to be displayed
        },
        // fan, switch, and dimmer buttons show the state of the device (e.g. on, off, low/med/high, 50%).
        // Use a label to render text above the button.
        { type: "label", text: "Ceiling Fan" },
        // example fan button
        { name: "Ceiling Fan", type: "fan", device: "Ceiling Fan" },
        // example dimmer button
        { type: "label", text: "Ceiling Light" },
        { name: "Light", type: "dimmer", device: "Ceiling Light" },
        // example macro buttons
        { type: "label", text: "Macros" },
        // TV Break macro pauses TV and turns on the ceiling fan light
        { name: "TV Break", type: "macro", device: "TV Break" },
        // TV Resume macro resumes TV and turns off the ceiling fan light
        { name: "TV Resume", type: "macro", device: "TV Resume" },
      ],
      // recapping the above:
      // You can have one or more theaters
      // Each theater has one or more devices
      // Each theater has one or more activities
      // Each theater can have handy buttons
    },
  ],

  // Dashboards
  // Dashboards are typically displayed on the device most of the time.  From the dashboard, you can see the state
  // of your home or office at a glance.  You can also control the most commonly used devices from the dashboard.
  //
  // You may have one or more dashboards, each displayed in its own tab when dashboard display is selected in the app.
  // You likely will have a very different dashboard configured for your theater room than the one for your bedroom
  // which will likely be different from your home office.
  //
  // The dashboard is a tiled display.  Tiles are 128x128, 128x256, 256x128 or 256x256 pixels.  There are several
  // tile types that you can use to configure your dashbaords.  The tile definitions include parameters that
  // define the device(s) that the tile monitors/controls.
  //
  // The dashboard is designed to be readable from a distance of several feet/meters.
  dashboards: [
    // example dashboard for the Theater room.
    {
      title: "Theater", // name of dashboard to be displayed in the UI
      key: "theater", // unique key to identify the dashboard tab
      // These are the tiles for the dashboard
      tiles: [
        // a large 256x256 tile that renders the current date/time (with seconds) and sunrise/sunset
        { type: "clock" },
        // a large 256x256 tile that renders the current weather, updates in real time
        { type: "weather", location: "92109" },

        // a 128x128 tile that monitors the state of one or more garage doors.  Renders red if any are open.
        {
          type: "garagedoor",
          title: "Garage Doors",
          devices: ["Garage Door Sensor", "Cart Door Sensor"], // the doors to monitor
        },

        // a large 256x256 tile that renders the inside temperature, and Nest Thermostat control
        { type: "thermostat", device: "Thermostat" },
        // a 256x128 tile that renders that status of your swimming pool controller.  Background is green if it is running.
        { type: "pool", controller: "autelis" },
        // a 256x128 tile that renders that status of your spa controller.  Background is red if it is running.
        { type: "spa", controller: "autelis" },
        // 128x128 dimmer tile (toggles on/off to the last dimmer setting)
        { device: "Ceiling Light", type: "dimmer" },
        // 128x128 switch tile (toggles )
        { device: "Kitchen Light", type: "switch" },
        // a 256x256 tile that renders that stat of a theater, along with audio controls
        {
          type: "theater",
          title: "Home Theater", // name of theater to display, as defined in the theaters section above
        },
        // 128x128 fan tile (rotates off -> low -> medium -> high -> off)
        { device: "Ceiling Fan", type: "fan" },

        // macro tiles
        { type: "macro", name: "TV Break", label: "TV Break" },
        { type: "macro", name: "TV Resume", label: "TV Resume" },
      ],
    },

    // a second dashboard definition
    // this is for a tablet you keep on your nightstand next to the bed (or on the wall)
    {
      title: "Bedroom",
      key: "bedroom",
      tiles: [
        { type: "clock" },
        // a large 256x256 tile that renders the current weather, updates in real time
        { type: "weather", location: "92109" },
        // a large 256x256 tile that renders the inside temperature, and Nest Thermostat control
        { type: "thermostat", device: "Thermostat" },
        { type: "spa", controller: "autelis" },
        {
          type: "garagedoor",
          title: "Garage Doors",
          devices: ["Garage Door Sensor", "Cart Door Sensor"],
        },
        { device: "Bathroom Light", type: "dimmer" },
        { device: "Bedroom Fan", type: "fan" },
        { device: "Bedroom Lamp", type: "switch" },
        { device: "Bedroom Light", type: "dimmer" },
        // macro to turn off all the lights in the house and set thermostat for sleeping comfort
        { type: "macro", name: "Good Night", label: "Good Night" },
        // macro to turn on some lights, set thermostat higher so your electric bill is less
        { type: "macro", name: "Good Morning", label: "Good Morning" },
      ],
    },
  ],
  // weather locations
  weather: {
    // for each location, a tab will be rendered in the UI.
    locations: [
      // name and zip code or (city name - see naming convention at here.com).
      { name: "New York, NY", device: "10001", default: true }, // default weather location
      { name: "San Diego, CA", device: "92109" },
    ],
  },
  // pool controller

  autelis: {
    device: "autelis", // host or IP address
    name: "Pool Control",
    url: "http://poolcontrol", // where the http page is
    location: "92109", // location for weather display
    // credentials to log in to the pool control HTTP UI.
    credentials: {
      // These are the defaults and will work unless you've changed them via the http UI.
      username: "admin",
      password: "admin",
    },
    // The forward and backward hash maps define the relationship between
    // Autelis device names and ones we want to use/display.
    // For example, on my pool hardware, autelis aux1 controls the spa jets;
    // we want to use "jets" in our logic, not aux1.
    //
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
        solarTemp: "solartemp",
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
        solarht: "solarHeat",
      },
    },
  },

  // Nest devices
  // The name fields must match the names you chose in the Nest app.

  nest: {
    // one or more thermostats
    thermostats: [{ device: "Thermostat", name: "Hallway Thermostat" }],
    // one or more Nest Protect (fire/CO2 detector)
    protects: [
      {
        device: "Nest Protect",
        name: "Entryway Nest Protect",
      },
    ],
  },
  // Sensors in your home/office

  sensors: [
    // a multisensor typically has more than one topic/thing to monitor (e.g. battery, motion, temperature...)
    {
      name: "Multisensor",
      topic: "smartthings/Multisensor/battery", // subscribe to this topic to monitor
      type: "battery",
    },
    {
      name: "Multisensor",
      topic: "smartthings/Multisensor/humidity",
      type: "humidity",
    },
    {
      name: "Multisensor",
      topic: "smartthings/Multisensor/illuminance",
      type: "illuminance",
    },
    {
      name: "Multisensor",
      topic: "smartthings/Multisensor/motion",
      type: "motion",
    },
    {
      name: "Multisensor",
      topic: "smartthings/Multisensor/temperature",
      type: "temperature",
    },
    // garage door sensors
    {
      name: "Cart Door Sensor",
      topic: "smartthings/Cart Door Sensor/contact",
      type: "contact",
    },
    {
      name: "Garage Door Sensor",
      topic: "smartthings/Garage Door Sensor/contact",
      type: "contact",
    },
    // door/window sensor
    {
      name: "Sliding Door",
      topic: "smartthings/Sliding Door/contact",
      type: "contact",
    },
    {
      name: "Sliding Door",
      topic: "smartthings/Sliding Door/temperature",
      type: "temperature",
    },
    // ring doorbell
    {
      name: "Front Door",
      topic: "smartthings/Front Door/motion",
      type: "motion",
    },
    {
      name: "Front Door",
      topic: "smartthings/Front Door/battery",
      type: "battery",
    },
    // Nest thermostat temperature sensor
    {
      name: "Thermostat",
      topic: "nest/structure/thermostat_name/status/ambient_temperature_f",
      type: "temperature",
    },
    {
      name: "Thermostat",
      topic: "nest/structure/thermostat_name/status/humidity",
      type: "humidity",
    },
  ],

  // SmartThings MQTT Bridge
  // Here we define every SmartThings (Z Wave/Zigbee) device we want to control via the SmartThings hub.

  smartthings: {
    device: "smartthings", // host name or ip address of SmartThings hub
    name: "SmartThings Hub", // user friendly name
    // These are the things reported or controlled by the hub.
    // In the app UI, when the SmartThings display is selected, there will be one tab for All things and additional tabs
    // for the rooms you define here.  A thing may be in one or more rooms, making the things rendered on your defined
    // tabs as useful as possible.
    things: [
      { name: "Ceiling Light", type: "dimmer", rooms: ["Theater"] },
      { name: "Ceiling Fan", type: "fan", rooms: ["Theater"] },
      {
        name: "Office Dimmer",
        type: "dimmer",
        rooms: ["Office"],
      },
      {
        name: "Office Light",
        type: "dimmer",
        rooms: ["Office"],
      },
      {
        name: "Office Fan",
        type: "fan",
        rooms: ["Office"],
      },
      {
        name: "Entryway Lights",
        type: "switch",
        rooms: ["Theater", "Office", "Back Room", "Bedroom"],
      },
      {
        name: "Kitchen Light",
        type: "dimmer",
        rooms: ["Kitchen"],
      },
      {
        name: "Bathroom Light",
        type: "dimmer",
        rooms: ["Bathroom"],
      },
      { name: "Bedroom Lamp", type: "switch", rooms: ["Bedroom"] },
      { name: "Bedroom Fan", type: "fan", rooms: ["Bedroom"] },
      { name: "Bedroom Light", type: "dimmer", rooms: ["Bedroom"] },
      { name: "Porch Light", type: "switch", rooms: ["Outside"] },
      { name: "Outside Light", type: "switch", rooms: ["Outside"] },
      { name: "Outdoor Lights", type: "switch", rooms: ["Outside"] },
      // smartthings can use an iPhone as a presence sensor
      { name: "iPhone", type: "presence", rooms: ["*"] },
      { name: "Sliding Door", type: "contact", rooms: ["*"] },
      {
        name: "Front Door",
        type: "motion",
        rooms: ["Outside"],
      },
      {
        name: "Bathroom Sensor",
        type: "motion",
        rooms: ["Bathroom"],
      },
      { name: "Sliding Door", type: "acceleration", rooms: ["*"] },
      { name: "Sliding Door", type: "temperature", rooms: ["*"] },
      { name: "Sliding Door", type: "threeAxis", rooms: ["*"] },
    ],
  },

  // define the TV Guides you want

  tvguide: {
    // example provider: Cox Los Angeles
    guides: [{ device: "SchedulesDirect Guide ID", name: "Name of TV Provider" }],
  },

  // define the TiVos you have in your home/office

  tivo: {
    guide: "SchedulesDirect Guide ID",
    favorites: tivoFavorites, // favorite channels
    // array of set top boxes
    boxes: [
      // device may optionally have a denon receiver device and a guide
      // if guide not provided, the global one for tivo (above) is used
      {
        // theater
        device: "tivo-bolt-3tb", // hostname or ip
        name: "Theater TiVo",
        denon: "denon",
        guide: "SchedulesDirect Guide ID",
      },
      {
        // bedroom
        device: "tivo-bolt", // hostname or ip
        name: "TiVo Bolt",
        denon: "denon-avr2",
        guide: "SchedulesDirect Guide ID",
      },
      { device: "tivo-office", name: "Mini Office", guide: "SchedulesDirect Guide ID" },
    ],
  },

  // The Denon AVRs in your home/office

  denon: {
    receivers: [
      { name: "Family Room Receiver", device: "denon-avr" },
      { name: "Bed Room Receiver", device: "denon-avr2" },
    ],
  },

  // The LG TVs in your home/office
  // Wake on Lan is used to wake up the TV, so the mac address is required.

  lgtv: {
    tvs: [
      {
        name: "Family Room TV", // name to display in the UI
        device: "lgtv", // hostname or IP
        mac: "00:00:00:00:00:00", // mac address of your LGTV
        denon: "denon-avr", // hostname or IP of Denon AVR
        favorites: lgtvFavorites, // favorite apps for the TV
      },
    ],
  },

  // The Sony/Bravia TVs in your home/office
  // Wake on Lan is used to wake up the TV, so the mac address is required.

  bravia: {
    tvs: [
      {
        name: "Bedroom TV",
        device: "sony-tv",
        favorites: braviaFavorites,
        mac: "00:00:00:00:00:00", // mac address of your TV
      },
    ],
  },

  // The Logitech Harmony remote Hubs in your home/office

  harmony: {
    hubs: [
      {
        name: "Family Room",
        device: "harmony-hub",
        ip: "x.x.x.x", // ip address of your hub
        mac: "xx:xx:xx:xx:xx:xx", // mac address of your hub
        denon: "denon-avr",
      },
    ],
  },

  // The Apple TVs in your home/office
  // Instructions for finding your device's credentials can be found in the appletv-microservice
  // repository.
  //
  // The serial number can be found in settings->general->about on your Apple TV.

  appletv: {
    devices: [
      {
        name: "Family Room Apple TV",
        device: "appletv-theater",
        serial: "C0xxxxxxxxx",
        credentials:
          "A very long string of random looking characters that you get by pairing with the Apple Tv",
      },
      {
        name: "Bedroom Apple TV",
        device: "appletv-mbr",
        serial: "C0xxxxxxxx",
        credentials:
          "A very long string of random looking characters that you get by pairing with the Apple Tv",
      },
    ],
  },
};
