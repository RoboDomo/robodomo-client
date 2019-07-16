import React, { useState } from "react";
import { IonCardContent, IonCard } from '@ionic/react';

const Tile = ({
  readOnly, // cannot be pressed if true
  backgroundColor, // background color of entire tile
  color, // text color of rendering on tile
  width, // width, in tiles (e.g. 1, 2)
  height, // height, in tiles (e.g. 1, 2)
  onClick, // if string, location.hash, if funciton, it is called
  children,
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
        window.location.hash = onClick;
      } else if (typeof onClick === "function") {
        onClick();
      }
    }, 500);
    setPressed(true);
  };

  return (
    <IonCard
      color="dark"
      width={width * 128}
      height={height * 128}
      backgroundColor={backgroundColor}
      onClick={handleClick}
    >
      <IonCardContent>{children}</IonCardContent>
    </IonCard>
  );
};
export default Tile;
