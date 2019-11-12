import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class Game extends Component {

  render() {
    return (
      <div>
        <div>Timestamp: {this.props.game.startTime}-{this.props.game.endTime}</div>
        <div>Stream URL: {this.props.game.stream.url}</div>
        <div>Deckcode: {this.props.game.deck.deckcode}</div>
      </div>
    )
  }

}

export default createFragmentContainer(Game, {game: graphql`
  fragment Game_game on Game {
    id
    startTime
    endTime
    deck {
      deckcode
    }
    stream {
      url
    }
  }
`})
