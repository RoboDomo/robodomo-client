import Config from "Config";

import React, { Component } from "react";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

export default class NumberField extends Component {
  constructor(props) {
    super();

    this.step = props.step || 1;
    this.timer = null;
    this.state = {
      value: Number(props.value)
    };
  }

  componentWillReceiveProps(props) {
    if (!this.timer) {
      this.setState({
        value: Number(props.value)
      });
    }
  }

  render() {
    return (
      <FormGroup style={{ marginBottom: 8 }}>
        <Col
          sm={Config.ui.labelCol}
          componentClass={ControlLabel}
          style={{ whiteSpace: "nowrap", float: "left" }}
        >
          {this.props.label}
        </Col>
        <Col sm={Config.ui.fieldCol} style={{ textAlign: "right" }}>
          <Button bsStyle="primary" onClick={this.onLeft.bind(this)}>
            <Glyphicon glyph="chevron-left" />
          </Button>
          <input
            type="text"
            style={{ width: 40, textAlign: "center" }}
            value={this.state.value}
            readOnly
          />
          <Button bsStyle="primary" onClick={this.onRight.bind(this)}>
            <Glyphicon glyph="chevron-right" />
          </Button>
        </Col>
      </FormGroup>
    );
  }

  change(value) {
    if (value <= this.props.min) {
      value = this.props.min;
    } else if (value >= this.props.max) {
      value = this.props.max;
    }
    if (value !== this.state.value) {
      this.setState({ value: value });
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.timer = null;
      if (this.props.onValueChange) {
        this.props.onValueChange(this.state.value);
      }
    }, 500);
  }

  onLeft() {
    this.change(this.state.value - this.step);
  }

  onRight() {
    this.change(this.state.value + this.step);
  }
}
