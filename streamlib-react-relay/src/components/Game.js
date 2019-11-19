import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'

class Game extends Component {

  constructor(props) {
    super(props)
    this.onClickStream = this.onClickStream.bind(this)
  }

  onClickStream() {
    window.location = `${this.props.game.stream.url}?t=${this.props.game.startTime}s`
  }

  render() {
    var bgColor = "LightGray"
    if (this.props.game.result === "victory") {
      bgColor = "LightBlue"
    } else if(this.props.game.result === "defeat") {
      bgColor = "LightPink"
    }
    const previewImgSrc = this.props.game.stream.preview
    return (
      <div style={Object.assign({}, styles.main, {backgroundColor: bgColor})}>
        <div style={styles.streamPreview} onClick={this.onClickStream}>
          <div>{`${this.props.game.playerName} vs. ${this.props.game.opponentName}`}</div>
          <img src={previewImgSrc} alt="Preview" style={styles.streamPreviewImg}/>
          <div>Timestamp: {this.props.game.startTime}-{this.props.game.endTime}</div>
          <b>{capitalize(this.props.game.result)}</b>
        </div>
        <div style={styles.infoPanel}>

          <div>Stream URL: {this.props.game.stream.url}</div>
          <div>Deckcode: {this.props.game.deck.deckcode}</div>
        </div>
      </div>
    )
  }
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const styles = {
  main: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    fontFamily: "Arial, Helvetica, sans-serif",
    height: "160px",
    width: "1200px"
  },
  streamPreview: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    cursor: "pointer"
  },
  streamPreviewImg: {
    width: "150px",
    borderRadius: "4px"
  },
  infoPanel: {
    display: "flex",
    flexDirection: "column",
    padding: "8px",
    justifyContent: "space-evenly"
  }
}

export default createFragmentContainer(Game, {game: graphql`
  fragment Game_game on Game {
    id
    startTime
    endTime
    playerName
    opponentName
    result
    stream {
      preview
      url
    }
    deck {
      deckcode
    }
  }
`})
