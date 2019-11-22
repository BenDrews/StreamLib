import React, { Component } from 'react'
import Game from './Game'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class GameList extends Component {

  render() {

    return (
      <div style={styles.main}>
      {this.props.viewer.allGames.edges.map(({node}) =>
       <Game key={node.__id} game={node} />
   )}
      </div>
    )
  }

}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column"
  }
}

export default createFragmentContainer(GameList, {viewer: graphql`
  fragment GameList_viewer on Viewer @argumentDefinitions(
    channelName: {type: "String"}
  ) {
    allGames(
      last: 20,
      orderBy: id_ASC,
      filter: {
        playerName: $channelName
      }
    ) @connection(key:"GameList_allGames", filters: []){
      edges {
        node{
          ...Game_game
        }
      }
    }
  }
  `
})
