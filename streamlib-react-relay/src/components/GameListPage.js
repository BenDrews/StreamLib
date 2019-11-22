import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../Environment'
import GameList from './GameList'

const GameListPageQuery = graphql`
  query GameListPageQuery($channelName: String) {
    viewer {
      ...GameList_viewer @arguments(channelName: $channelName)
    }
  }
`

class GameListPage extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={GameListPageQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <GameList viewer={props.viewer} />
          }
          return <div>Loading</div>
        }}
      variables={{
        channelName: props.channelName,
      }}
      />
    )
  }

}

export default GameListPage
