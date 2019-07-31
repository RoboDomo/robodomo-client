/**
 * <RemoteButton>
 *
 * RemoteButton implements a button for a remote control.  When pressed, it will
 * send props.message to props.topic via MQTT by default.  If props.onClick is present,
 * that method is called instead.  If props.mini is true, the button is rendered half width,
 * which is suitable for play/pause/rewind control button bar.  If props.variant is "none", then
 * no button is rendered, but a div of button width is rendered instead; this allows rendering
 * of joystick buttons, for example.
 */
import React from "react";

import { IonButton } from "@ionic/react";

import MQTT from "@/lib/MQTT";

const RemoteButton = ({ variant, topic, message, dispatch, action, mini, children, onClick }) => {
  const w = Math.min(window.screen.availWidth / 5 - 4, 100);
  const style = {
    width: mini ? 46 : w,
    height: 40,
    fontSize: 14,
  };
  if (variant === "none") {
    return (
      <div
        style={{
          width: style.width,
          height: style.height,
          float: "left",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <IonButton
      color={variant}
      style={style}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        if (topic && message) {
          MQTT.publish(topic, message);
        } else if (dispatch && action) {
          dispatch({ type: action });
        } else if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </IonButton>
  );
};

//
export default RemoteButton;
