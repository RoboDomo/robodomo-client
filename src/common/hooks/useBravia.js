import { useState, useEffect, useReducer } from "react";
import useConfig from "@/common/hooks/useConfig";
import MQTT from "@/lib/MQTT";

const codes = [
  "*AD",
  "ActionMenu",
  "Analog",
  "Analog2",
  "AnalogRgb1",
  "AndroidMenu",
  "Assists",
  "Audio",
  "AudioMixDown",
  "AudioMixUp",
  "BS",
  "BSCS",
  "Blue",
  "CS",
  "ChannelDown",
  "ChannelUp",
  "ClosedCaption",
  "Component1",
  "Component2",
  "Confirm",
  "CursorDown",
  "CursorLeft",
  "CursorRight",
  "CursorUp",
  "DOT",
  "DUX",
  "Ddata",
  "DemoMode",
  "DemoSurround",
  "Digital",
  "DigitalToggle",
  "Display",
  "Down",
  "DpadCenter",
  "EPG",
  "Enter",
  "Exit",
  "FeaturedApp",
  "FeaturedAppVOD",
  "FlashMinus",
  "FlashPlus",
  "FootballMode",
  "Forward",
  "GGuide",
  "GooglePlay",
  "Green",
  "Hdmi1",
  "Hdmi2",
  "Hdmi3",
  "Hdmi4",
  "Help",
  "Home",
  "Input",
  "Jump",
  "Left",
  "Media",
  "MediaAudioTrack",
  "Mode3D",
  "Mute",
  "Netflix",
  "Next",
  "Num0",
  "Num1",
  "Num11",
  "Num12",
  "Num2",
  "Num3",
  "Num4",
  "Num5",
  "Num6",
  "Num7",
  "Num8",
  "Num9",
  "OneTouchTimeRec",
  "OneTouchView",
  "Options",
  "PAP",
  "Pause",
  "PhotoFrame",
  "PicOff",
  "PictureMode",
  "PictureOff",
  "Play",
  "PopUpMenu",
  "PowerOff",
  "Prev",
  "Rec",
  "Red",
  "Return",
  "Rewind",
  "Right",
  "ShopRemoteControlForcedDynamic",
  "Sleep",
  "SleepTimer",
  "Stop",
  "SubTitle",
  "SyncMenu",
  "Teletext",
  "TenKey",
  "TopMenu",
  "Tv",
  "TvAnalog",
  "TvAntennaCable",
  "TvInput",
  "TvPower",
  "TvSatellite",
  "Tv_Radio",
  "Up",
  "Video1",
  "Video2",
  "VolumeDown",
  "VolumeUp",
  "WakeUp",
  "Wide",
  "WirelessSubwoofer",
  "Yellow",
  "iManual",
];

const useBravia = config => {
  const Config = useConfig();
  const hostname = config.device;
  const status_topic = Config.mqtt.bravia + "/" + hostname + "/status/",
    set_topic = status_topic.replace("status", "set") + "command";

  const [power, setPower] = useState(false);
  const [input, setInput] = useState("Off");
  const [volume, setVolume] = useState(null);
  const [appsList, setAppsList] = useState(null);
  const [appsMap, setAppsMap] = useState(null);

  const reducer = (state, action) => {
    if (~codes.indexOf(action.type)) {
      MQTT.publish(set_topic, action.type);
      return;
    }
    const act = action.type.toLowerCase();
    switch (act) {
      default:
        console.error("useBravia reducer invalid action", action);
    }
  };

  const handleAppsList = (topic, message) => {
    setAppsList(message);
  };

  const handleAppsMap = (topic, message) => {
    setAppsMap(message);
  };

  const handleInput = (topic, message) => {
    setInput(message);
  };

  const handlePower = (topic, message) => {
    setPower(message);
  };

  const handleVolume = (topic, message) => {
    setVolume(message.speaker);
    console.log("volume", message.speaker);
    //
  };

  useEffect(() => {
    MQTT.subscribe(status_topic + "appsList", handleAppsList);
    MQTT.subscribe(status_topic + "appsMap", handleAppsMap);
    MQTT.subscribe(status_topic + "input", handleInput);
    MQTT.subscribe(status_topic + "power", handlePower);
    MQTT.subscribe(status_topic + "volume", handleVolume);
    return () => {
      MQTT.unsubscribe(status_topic + "appsList", handleAppsList);
      MQTT.unsubscribe(status_topic + "appsMap", handleAppsMap);
      MQTT.unsubscribe(status_topic + "input", handleInput);
      MQTT.unsubscribe(status_topic + "power", handlePower);
      MQTT.unsubscribe(status_topic + "volume", handleVolume);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [, d] = useReducer(reducer);
  return {
    ...config,
    dispatch: d,
    power: power,
    input: input,
    volume: volume,
    appsList: appsList,
    appsMap: appsMap,
  };
};

export default useBravia;
