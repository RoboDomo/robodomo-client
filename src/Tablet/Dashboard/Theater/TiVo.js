import React from "react";
import { Image } from "react-bootstrap";

import useTiVo from "common/hooks/useTiVo";
import useTVGuide from "common/hooks/useTVGuide";

const TiVo = ({ device }) => {
  const tvguide = useTVGuide(device.guide);
  const tivo = useTiVo(device);

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
