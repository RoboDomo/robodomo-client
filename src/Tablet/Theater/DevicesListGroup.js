import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

const DevicesListGroup = ({ devices, currentDevice, tvInput, avrInput, onClick }) => {
  tvInput = tvInput || "off";
  if (!devices.length || !tvInput) {
    return null;
  }

  //<ListGroup.Item variant="dark">Devices</ListGroup.Item>
  return (
    <ListGroup>
      <div style={{ fontWeight: "bold", textAlign: "center" }}>Devices</div>
      {devices.map(device => {
        const deviceType = device.type;
        let deviceName = device.name;

        if (deviceType === "bravia" || deviceType === "lgtv") {
          if (true || ~tvInput.indexOf("hdmi")) {
            deviceName = (
              <>
                {device.name}
                <Badge variant="secondary" className="float-right">
                  {tvInput.toUpperCase()}
                </Badge>
              </>
            );
          } else {
            deviceName = (
              <>
                {device.name}
                <br />
                {tvInput.toUpperCase()}
              </>
            );
          }
        } else if (deviceType === "denon" && avrInput) {
          deviceName = (
            <>
              {device.name}
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
