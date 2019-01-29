import Config from '../../../Config'

import React from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'
import Badge from 'react-bootstrap/lib/Badge'

export default class SliderField extends React.Component {
  constructor(props) {
    super()

    if (!props.name) {
      throw new Error('SliderField name prop required')
    }
    this.state = {
      step:      Number(props.step || 1),
      value:     Number(props.value || 0),
      min:       Number(props.min || 0),
      max:       Number(props.max || 100),
      precision: Number(props.precision || 0),
    }
  }

  render() {
    const state = this.state
    return (
      <FormGroup style={{ marginBottom: 0 }}>
        <Col
          componentClass={ControlLabel}
          sm={Config.ui.labelCol}
          style={{whiteSpace: 'nowrap', float: 'left'}}
        >
          {this.props.label}
        </Col>
        <Col sm={Config.ui.fieldCol - 1} style={{textAlign: 'right', paddingTop: 4, paddingRight: 50}}>
          <ReactBootstrapSlider
            style={{width: '100%'}}
            value={Number(this.props.value)}
            step={state.step}
            min={state.min}
            max={state.max}
            slideStop={this.onSliderStop.bind(this)}
            change={::this.onSliderChange}
          />
        </Col>
        <Col sm={1} style={{paddingLeft: 0}}>
          <Badge>{this.state.value.toFixed(state.precision)}</Badge>
        </Col>
      </FormGroup>
    )
  }

  onSliderStop(e) {
    const value = e.target.value
    this.setState({value: value})
    if (this.props.onSliderStop) {
      this.props.onSliderStop(this.props.name, value, this)
    }
  }

  onSliderChange(e) {
    const value = e.target.value
    this.setState({value: value})
    if (this.props.onSliderChange) {
      this.props.onSliderChange(this.props.name, value, this)
    }
  }
}
