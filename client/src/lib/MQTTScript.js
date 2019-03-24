import React, { useState, useRef, useEffect } from "react";

import MQTT from "lib/MQTT";

const MQTTScript = ({ script, onComplete }) => {
  const currentCommand = useRef(null);
  const scriptCopy = useRef(null);
  const [timer, setTimer] = useState(null);

  const complete = () => {
    currentCommand.current = null;
    clearInterval(timer);
    setTimer(null);
    if (onComplete) {
      onComplete();
    }
  };
  if (script && !scriptCopy.current && !timer) {
    scriptCopy.current = script.slice();
    const t = setInterval(() => {
      //      if (!scriptCopy.current) {
      //        return;
      //      }
      currentCommand.current = scriptCopy.current.shift();
      if (!currentCommand.current) {
        console.log("!currentCommand");
        complete();
      } else {
        console.log(
          "-----> PUBLISH",
          currentCommand.current.topic,
          currentCommand.current.message
        );
        MQTT.publish(
          currentCommand.current.topic,
          currentCommand.current.message
        );
        if (scriptCopy.current.length === 0) {
          console.log("!scriptCopy.length");
          complete();
        }
      }
    }, 100);
    setTimer(t);
  }

  if (!script) {
    return null;
  }

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    };
  }, [scriptCopy, currentCommand]);

  if (!currentCommand.current) {
    return <div>NO CURRENT</div>;
  }

  return <div>{currentCommand.current.text}</div>;
};

export default MQTTScript;
