import React, { lazy } from "react";

const Div = lazy(() =>
  import("framer-motion" /* webpackChunkName: "framer", webpackPreload: true */).then(mod => ({
    default: mod.motion.div,
  }))
);

const AnimatedDiv = props => <Div {...props} />;

export default AnimatedDiv;
