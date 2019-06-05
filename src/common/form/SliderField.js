import React, { useState } from "react";
import PropTypes from "prop-types";

import ReactBootstrapSlider from "react-bootstrap-slider";
import { FormGroup, ControlLabel, Col, Badge } from "react-bootstrap";

import Config from "Config";

const SliderField = ({
  label,
  name,
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  precision = 0,
  onSliderStop,
  onSliderChange,
}) => {
  const [val, setVal] = useState(value);
  return (
    <FormGroup style={{ marginBottom: 0 }}>
      // TODO: componentClass? See react-bootstrap docs
      <Col componentClass={ControlLabel} sm={4} style={{ whiteSpace: "nowrap", float: "left" }}>
        {label}
      </Col>
      <Col sm={7} style={{ textAlign: "right", paddingTop: 4, paddingRight: 50 }}>
        <ReactBootstrapSlider
          style={{ width: "100%" }}
          value={Number(val)}
          step={step}
          min={min}
          max={max}
          slideStop={e => {
            const value = Number(e.target.value);
            setVal(value);
            if (onSliderStop) {
              onSliderStop(name, value);
            }
          }}
          change={e => {
            const value = e.target.value;
            setVal(value);
            if (onSliderChange) {
              onSliderChange(name, value);
            }
          }}
        />
      </Col>
      <Col sm={1} style={{ paddingLeft: 0 }}>
        <Badge>{val.toFixed(precision)}</Badge>
      </Col>
    </FormGroup>
  );
};

SliderField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  precision: PropTypes.number,
  onSliderStop: PropTypes.func,
  onSliderChange: PropTypes.func,
};

export default SliderField;
