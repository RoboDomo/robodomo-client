import React, { useState, useEffect, useRef } from "react";

const Clock = ({ cb }) => {
  const [time, setTime] = useState(new Date());
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(new Date());
      if (cb) {
        cb(time);
      }
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  });

  return <>{time.toLocaleTimeString()}</>;
};
export default Clock;
