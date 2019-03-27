/**
 * <RmoteButton>
 *
 * RemoteButton implements a button for a remote control.  When pressed, it will
 * send props.message to props.topic via MQTT by default.  If props.onClick is present,
 * that method is called instead.  If props.mini is true, the button is rendered half width,
 * which is suitable for play/pause/rewind control button bar.  If props.variant is "none", then
 * no button is rendered, but a div of button width is rendered instead; this allows rendering
 * of joystick buttons, for example.
 */
import React from "react";

import { Button } from "react-bootstrap";
import MQTT from "lib/MQTT";

const RemoteButton = ({ variant, topic, message, mini, children, onClick }) => {
  const style = {
    width: mini ? 50 : 100,
    height: 40,
    fontSize: 14
  };
  if (variant === "none") {
    return (
      <div
        style={{
          width: style.width,
          height: style.height,
          float: "left"
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      style={style}
      onClick={() => {
        if (topic && message) {
          console.log("publish", topic, message);
          MQTT.publish(topic, message);
        } else if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </Button>
  );
};
export default RemoteButton;
