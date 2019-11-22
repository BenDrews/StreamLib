import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../Environment'
import GameList from './GameList'


class MainSearchBar extends Component {

  render() {
    return (
      <div>
        <input type="text" className="searchInput" placeholder="Search for a streamer..." />
      </div>
    )
  }

  _handleSearchSubmit(e) {
    var channelSearchTerm = e.target.value
  }
}

export default MainSearchBar
