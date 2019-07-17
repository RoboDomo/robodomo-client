/**
 * MacroTile
 *
 * A tile that runs a macro when pressed.
 */
import React, { useReducer } from "react";
import macrosReducer from "@/hooks/reducers/macrosReducer";

import Tile from "./Tile";
import { FaRunning } from "react-icons/fa";

const MacroTile = ({ label, name }) => {
  const [, dispatch] = useReducer(macrosReducer, { macro: name });
  const onClick = () => {
    if (!name) {
      console.warn("MacroTile needs name prop");
    } else {
      dispatch({ action: name });
    }
  };

  return (
    <Tile width={1} height={1}>
      <div style={{ flexDirection: "column", textAlign: "center" }} onClick={onClick}>
        <div style={{ fontSize: 24, marginBottom: 10 }}>
          <FaRunning size={24} />
        </div>
        <div>{"Macro"}</div>
        <div>{label}</div>
      </div>
    </Tile>
  );
};

//
export default MacroTile;
