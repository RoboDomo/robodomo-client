import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

const DevicesListGroup = ({
  devices,
  currentDevice,
  tvInput,
  avrInput,
  onClick
}) => {
  tvInput = tvInput || "off";
  if (!devices.length || !tvInput) {
    return null;
  }

  return (
    <ListGroup>
      <ListGroup.Item variant="dark">Devices</ListGroup.Item>
      {devices.map(device => {
        let deviceName = device.name;
        if (deviceName === "LG TV" && ~tvInput.indexOf("hdmi")) {
          deviceName = (
            <>
              {deviceName}
              <Badge variant="secondary" className="float-right">
                {tvInput.toUpperCase()}
              </Badge>
            </>
          );
        } else if (deviceName === "AVR" && avrInput) {
          deviceName = (
            <>
              {deviceName}
              <Badge variant="secondary" className="float-right">
                {avrInput.toUpperCase()}
              </Badge>
            </>
          );
        }

        return (
          <ListGroup.Item
            active={currentDevice === device.name}
            onClick={() => {
              onClick(device);
            }}
            key={device.name}
          >
            {deviceName}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default DevicesListGroup;
