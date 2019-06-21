import React from "react";
import { Image } from "react-bootstrap";

import useTiVo from "@/hooks/useTiVo";

const TiVo = ({ device }) => {
  const tivo = useTiVo(device);
  const tvguide = tivo.guide;

  const info = tvguide.channels[tivo.channel];
  if (!info) {
    return null;
  }

  return (
    <>
      <Image style={{ width: 64, height: "auto" }} src={info.logo.URL} />
      <div style={{ marginBottom: 8 }}>
        {tivo.channel} {info.name}
      </div>
    </>
  );
};

//
export default TiVo;
