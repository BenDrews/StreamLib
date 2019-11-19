const { DeckEncoder } = require('runeterra')
import { request, GraphQLClient } from 'graphql-request'

module.exports = async function recordStream(data) {
  const endpoint = "https://api.graph.cool/simple/v1/ck2rbhj6p08or0180oh3jb5q3"
  const client = new GraphQLClient(endpoint, { headers: {} })

  const deckcode = data.deckcode
  const deck = await client.request(`query {allGames(orderBy: startTime_DESC) {id}}`)
  const existingDeckEdges = await client.request(`query {
    allDecks(filter: {deck: ${deckcode}}, last: 1, orderBy: id_DESC) {
      edges {
        node {
          id
        }
      }
    }
  }`)
  const existingDecks = existingDeckEdges['edges'];
  if (existingDecks.length > 0) {
    const deckID = existingDecks[0]['id']
  } else {
    const deckID = await recordDeck(deckcode, client)
  }

  const gameResp = await client.request(`mutation {
    createGame(
      startTime: ${data.startTime},
      endTime: ${data.endTime},
      result: "${data.result}",
      playerName: "${data.playerName}",
      opponentName: "${data.opponentName}",
      deck: ${deckID}) {
        id
      }
  }`)

  return {
    data: {
      gameResp['id']
    }
  }
}
