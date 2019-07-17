import React, { useState } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import s from "./Tile.module.css";
import { withRouter } from "react-router";

const Tile = ({
  readOnly, // cannot be pressed if true
  color, // text color of rendering on tile
  width, // width, in tiles (e.g. 1, 2)
  height, // height, in tiles (e.g. 1, 2)
  onClick, // if string, location.hash, if funciton, it is called
  children,
  history,
}) => {
  const [pressed, setPressed] = useState(false);
  let timer = null;

  const handleClick = () => {
    if (readOnly || timer) {
      return;
    }
    timer = setTimeout(() => {
      timer = null;
      setPressed(false);
      if (typeof onClick === "string") {
        history.push(onClick);
      } else if (typeof onClick === "function") {
        onClick();
      }
    }, 500);
    setPressed(true);
  };

  return (
    <IonCard
      class={s.card}
      color={color || "dark"}
      button={!readOnly}
      onClick={handleClick}
      style={{
        width: width * 128 - 8,
        height: height * 128 - 8,
        gridColumnEnd: "span " + width,
        gridRowEnd: "span " + height,
      }}
    >
      <IonCardContent class={s.content}>{children}</IonCardContent>
    </IonCard>
  );
};
export default withRouter(Tile);
