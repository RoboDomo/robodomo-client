import React from "react";
import { Badge, ListGroup, ListGroupItem } from "react-bootstrap";

export default ({ devices, currentDevice, tvInput, avrInput, onClick }) => {
  console.log("devices", devices, tvInput);
  tvInput = tvInput || "off";
  if (!devices.length || !tvInput) {
    return null;
  }

  return (
    <ListGroup>
      <h5>Devices</h5>
      {devices.map(device => {
        let deviceName = device.name;
        if (deviceName === "LG TV" && ~tvInput.indexOf("hdmi")) {
          deviceName = (
            <>
              {deviceName}
              <Badge pullRight>{tvInput.toUpperCase()}</Badge>
            </>
          );
        } else if (deviceName === "AVR" && avrInput) {
          deviceName = (
            <>
              {deviceName}
              <Badge pullRight>{avrInput.toUpperCase()}</Badge>
            </>
          );
        }
        return (
          <ListGroupItem
            as="button"
            active={currentDevice === device.name}
            onClick={() => {
              onClick(device);
            }}
            key={device.name}
          >
            {deviceName}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};
