import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class Game extends Component {

  render() {
    return (
      <div>
        <div>{this.props.game.start_time}-{this.props.game.end_time}</div>
        <div>{this.props.game.stream.url}</div>
      </div>
    )
  }

}

export default createFragmentContainer(Game, graphql`
  fragment Game_game on Game {
    id
    start_time
    end_time
    stream {
      url
    }
  }
`)
