import React, { useState, useEffect, useRef } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  });

  return <>{time.toLocaleTimeString()}</>;
};
export default Clock;
