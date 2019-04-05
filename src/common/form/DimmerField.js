import React /*, { useState, useEffect, useRef }*/ from "react";

import ReactBootstrapSlider from "react-bootstrap-slider";
import Toggle from "react-bootstrap-toggle";

const DimmerField = ({
  label,
  name,
  value,
  toggled,
  onToggle,
  onValueChange
}) => {
  const applyValueChange = val => {
    value = val;
    if (onValueChange) {
      onValueChange(`${name}/level`, value);
    }
  };

  const handleSliderChange = e => {
    const val = e.target.value;
    applyValueChange(val);
  };

  const handleToggle = state => {
    if (onToggle) {
      onToggle(name, state);
    }
  };

  return (
    <div style={{ display: "flex", marginTop: 10 }}>
      <div style={{ marginTop: 10, flex: 1 }}>{label}</div>
      <div style={{ whiteSpace: "nowrap", display: "flex" }}>
        <Toggle
          active={toggled}
          onClick={handleToggle}
          style={{ flex: 1, marginRight: 20 }}
        />
        <div style={{ flex: 1, marginTop: 10 }}>
          <ReactBootstrapSlider
            style={{ flex: 1, paddingTop: 8 }}
            value={value || 0}
            step={1}
            slideStop={handleSliderChange}
            min={1}
            max={100}
          />
        </div>
      </div>
    </div>
  );
};

//
export default DimmerField;
