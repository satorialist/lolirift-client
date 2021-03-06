import React, { Component, PropTypes } from 'react'

import { blueGrey900, grey700 } from 'material-ui/styles/colors'
import { red500, green500 } from 'material-ui/styles/colors'

import Navigation from '../Navigation'
import Grid from './Grid'
import Map from './Map'
import Actions from './Actions'

export default class Game extends Component {

  static propTypes = {
    player: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,

    units: PropTypes.arrayOf(
      PropTypes.shape({
        owner: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        texture: PropTypes.string.isRequired,
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        }).isRequired
      })
    ).isRequired,

    actions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        paramTypes: PropTypes.object.isRequired,
        svg: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }

  state = {
    origin: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      boundaries: {
        lower: {
          x: 0,
          y: 0,
        },
        upper: {
          x: 0,
          y: 0,
        }
      }
    },
    selection: []
  }

  onSetOrigin = (origin) => {
    this.setState({
      origin
    })
  }

  onSetSelection = (selection) => {
    this.setState({
      selection
    })
  }

  onActionClick = (action) => {
    var json = { unit: 0, action }
    this.props.ws.send(JSON.stringify(json))
  }

  render () {
    console.log(this.props.ws)
    return (
      <div>
        <Navigation color={blueGrey900} hoverColor={grey700} />
        <Grid
          units={this.props.units}
          onSetOrigin={this.onSetOrigin.bind(this)}
          onSetSelection={this.onSetSelection.bind(this)}
          origin={this.state.origin}
          selection={this.state.selection}
        />
        <Map
          units={this.props.units}
          player={this.props.player}
          origin={this.state.origin}
          friendlyUnitColor={red500}
          anyUnitColor={green500}
        />
        <Actions
          actions={this.props.actions}
          onClick={this.onActionClick.bind(this)}
        />
      </div>
    )
  }
}
