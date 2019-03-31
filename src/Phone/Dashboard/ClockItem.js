import React, { useState, useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";

import Clock from "common/Clock";

const ClockItem = () => {
  return (
    <ListGroup.Item
      style={{ fontSize: 50, whiteSpace: "nowrap", textAlign: "center" }}
    >
      <Clock />
    </ListGroup.Item>
  );
};

export default ClockItem;
