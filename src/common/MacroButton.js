import React, { useReducer } from "react";
import RemoteButton from "@/common/RemoteButton";
import macrosReducer from "@/hooks/reducers/macrosReducer";

const MacroButton = ({ macro, children }) => {
  const [, dispatch] = useReducer(macrosReducer, { macro: macro });
  return (
    <RemoteButton
      onClick={() => {
        dispatch({ action: macro });
      }}
    >
      {children}
    </RemoteButton>
  );
};

//
export default MacroButton;
