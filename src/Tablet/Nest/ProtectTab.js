/**
 * Tab to display/conrol Nest Protect (CO2/Fire detector)
 */

import React from "react";
import useProtect from "@/hooks/useProtect";

import { Badge } from "react-bootstrap";
import { FaCheck, FaWindowClose, FaHome, FaRoad } from "react-icons/fa";

// device, name
const ProtectTab = ({ sensor }) => {
  const protect = useProtect(sensor);

  const GOOD = <FaCheck style={{ color: "green" }} />,
    BAD = <FaWindowClose style={{ color: "red" }} />,
    HOME = <FaHome style={{ color: "green" }} />,
    AWAY = <FaRoad style={{ color: "red" }} />;

  const style = { backgroundColor: protect.uiColor, fontSize: 20, padding: 10 };
  return (
    <div style={{ margin: 0, paddingLeft: 20 }}>
      <div style={style}>
        <h1>
          {sensor.name} Nest Protect <Badge variant="secondary">{protect.softwareVersion}</Badge>
        </h1>
        <div>{protect.testActive ? "TEST ACTIVE" : "Last Manual Test: " + protect.lastTest}</div>
      </div>
      <h1>
        {protect.away === "home" ? HOME : AWAY} You are {protect.away}
      </h1>
      <div style={{ fontSize: 30 }}>
        <div>{protect.online ? GOOD : BAD} Online</div>
        <div>{protect.battery ? GOOD : BAD} Battery</div>
        <div>{protect.co2 ? GOOD : BAD} Co2</div>
        <div>{protect.smoke ? GOOD : BAD} Smoke</div>
      </div>
    </div>
  );
};

//
export default ProtectTab;
