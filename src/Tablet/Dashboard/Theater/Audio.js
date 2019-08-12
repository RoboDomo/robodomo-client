import React, { useReducer } from "react";
import useDenon from "@/hooks/useDenon";
import denonReducer from "@/hooks/reducers/denonReducer";

import { ButtonGroup } from "react-bootstrap";
import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";

import RemoteButton from "@/common/RemoteButton";

const Audio = ({ device }) => {
  const avr = useDenon(device),
    mute = avr.mute;
  const [, dispatch] = useReducer(denonReducer, { device: device });

  return (
    <>
      <ButtonGroup>
        <RemoteButton
          mini
          variant={mute ? "danger" : undefined}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            console.log("avr", avr);
            dispatch({ type: avr.mute ? "unmute" : "mute" });
          }}
        >
          <FaVolumeMute />
        </RemoteButton>

        <RemoteButton
          mini
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "masterdown" });
          }}
        >
          <FaVolumeDown />
        </RemoteButton>

        <RemoteButton
          mini
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "masterup" });
          }}
        >
          <FaVolumeUp />
        </RemoteButton>
      </ButtonGroup>
      <ButtonGroup style={{ marginTop: 4 }}>
        <RemoteButton
          mini
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "auto" });
          }}
        >
          Auto
        </RemoteButton>
        <RemoteButton
          mini
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: "movie" });
          }}
        >
          Movie
        </RemoteButton>
      </ButtonGroup>
    </>
  );
};

//
export default Audio;
