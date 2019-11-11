import React, { Component } from 'react'
import Game from './Game'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class GameList extends Component {

  render() {

    const gamesToRender = [{
      id: '1',
      start_time: 0,
      end_time: 180,
      stream: {
        url: 'twitch.tv/xaresim',
      }
    }, {
      id: '2',
      start_time: 200,
      end_time: 260,
      stream: {
        url: 'twitch.tv/xaresim',
      }
    }]

    return (
      <div>
      {this.props.viewer.allGames.edges.map(({node}) =>
       <Game key={node.__id} game={node} />
   )}
      </div>
    )
  }

}

export default createFragmentContainer(GameList, graphql`
  fragment GameList_viewer on Viewer {
    allGames(last: 100, orderBy: createdAt_DESC) @connection(key: "GameList_allLinks", filters: []) {
      edges {
        node {
          ...Game_game
        }
      }
    }
  }
`)
