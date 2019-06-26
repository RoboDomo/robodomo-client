import React from "react";
import useConfig from "@/hooks/useConfig";
import Locale from "@/lib/Locale";

const val = n => {
  return parseInt(n * 10) / 10;
};

const Distance = ({ value, units = true, metric = false }) => {
  const Config = useConfig(),
    isMetric = metric || Config.metric;

  if (isMetric) {
    return (
      <>
        {val(Locale.mphtokph(value, isMetric))}
        {units ? <span> Km</span> : null}
      </>
    );
  } else {
    return (
      <>
        {val(value)}
        {units ? <span> Mi</span> : null}
      </>
    );
  }
};

//
export default Distance;
