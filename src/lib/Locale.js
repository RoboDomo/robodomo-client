import React from "react";

/**
 * Locale conversion routines
 */
const ftoc = (n, metric) => {
  return metric ? parseInt((10 * (Number(n) - 32)) / 1.8, 10) / 10 : parseInt(n, 10);
};

const ctof = (n, metric) => {
  return metric ? parseInt((Number(n) * 9) / 5 + 32, 10) : parseInt(n, 10);
};

const mphtokph = (n, metric) => {
  return metric ? parseInt(Number(n) * 1.609344 * 10, 10) / 10 : parseInt(n, 10);
};

const kphtomph = (n, metric) => {
  return metric ? parseInt(Number(n) * 0.6213711922 * 10, 10) / 10 : parseInt(n, 10);
};

const Locale = {
  ftoc: ftoc,
  ctof: ctof,
  mphtokph: mphtokph,
  kphtomph: kphtomph,
  toString: () => {
    return "Singleton Locale";
  },
};

//
export default Locale;
export { ftoc, ctof, mphtokph, kphtomph };
