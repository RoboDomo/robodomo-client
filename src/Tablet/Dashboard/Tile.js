import React, { useState } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import { withRouter } from "react-router";
import s from "./Tile.module.css";
import AnimatedDiv from "@/common/AnimatedDiv";

const Tile = ({
  readOnly, // cannot be pressed if true
  color, // text color of rendering on tile
  width, // width, in tiles (e.g. 1, 2)
  height, // height, in tiles (e.g. 1, 2)
  onClick, // if string, location.hash, if funciton, it is called
  children,
  history,
}) => {
  const [, setPressed] = useState(false);
  let timer = null;

  const handleClick = () => {
    if (readOnly || timer) {
      return;
    }
    timer = setTimeout(() => {
      timer = null;
      setPressed(false);
      if (typeof onClick === "string") {
        history.push(`/${onClick}`);
      } else if (typeof onClick === "function") {
        onClick();
      }
    }, 500);
    setPressed(true);
  };

  return (
    <AnimatedDiv
      animate={{
        opacity: [0.5, 1],
        rotateX: [70, 0, 0],
      }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      style={{
        gridColumnEnd: "span " + width,
        gridRowEnd: "span " + height,
        opacity: 0,
      }}
    >
      <IonCard
        style={{
          width: width * 128 - 8,
          height: height * 128 - 8,
        }}
        class={s.card}
        color={color || "dark"}
        button={!readOnly}
        onClick={handleClick}
      >
        <IonCardContent class={s.content}>{children}</IonCardContent>
      </IonCard>
    </AnimatedDiv>
  );
};
export default withRouter(Tile);
