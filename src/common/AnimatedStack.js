import React, { useState, useEffect, memo } from "react";
import cx from "classnames";

import s from "./AnimatedStack.module.css";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.05,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const AnimatedStack = ({ className, render, children, ...rest }) => {
  const [Container, setContainer] = useState(null);
  const [Item, setItem] = useState(null);

  useEffect(() => {
    import("framer-motion" /* webpackChunkName: "framer", webpackPreload: true */).then(mod => {
      setItem(mod.motion.li);
    });

    import("framer-motion" /* webpackChunkName: "framer", webpackPreload: true */).then(mod => {
      setContainer(mod.motion.ul);
    });
  }, []);

  if (Container && Item) {
    return (
      <Container
        initial="hidden"
        animate="visible"
        {...rest}
        className={cx(s.container, className)}
        variants={container}
      >
        {children.map((child, idx) => (
          <Item variants={item} key={idx}>
            {child}
          </Item>
        ))}
      </Container>
    );
  }

  return null;
};

export default memo(AnimatedStack);
