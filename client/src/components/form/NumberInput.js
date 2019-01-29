import React, {Component} from 'react'

import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

export default class NumberInput extends Component {
  constructor(props) {
    super(props)

    this.timer = null
    this.state = {
      value: Number(props.value)
    }

    this.onLeft = this.onLeft.bind(this)
    this.onRight = this.onRight.bind(this)
  }

  componentWillReceiveProps(props) {
    if (!this.timer) {
      this.setState({
        value: Number(props.value)
      })
    }
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.onLeft.bind(this)}
        >
          <Glyphicon glyph="chevron-left"/>
        </Button>
        <input
          type="text"
          style={{width: 40, textAlign: 'center'}}
          value={this.state.value}
          readOnly
        />
        <Button
          bsStyle="primary"
          onClick={this.onRight.bind(this)}
        >
          < Glyphicon
            glyph="chevron-right"
          />
        </Button>
      </div>
    )
  }

  change(value) {
    if (value <= this.props.min) {
      value = this.props.min
    }
    else if (value >= this.props.max) {
      value = this.props.max
    }
    if (value !== this.state.value) {
      this.setState({ value: value })
    }
    if (this.timer) {
      clearTimeout(this.timer)
    }
    var me = this
    this.timer = setTimeout(() => {
      me.timer = null
      if (me.props.onValueChange) {
        me.props.onValueChange(me.state.value)
      }
    }, 500)
  }

  onLeft(e) {
    e.stopPropagation()
    this.change(this.state.value-1)
  }

  onRight(e) {
    e.stopPropagation()
    this.change(this.state.value+1)
  }
}
