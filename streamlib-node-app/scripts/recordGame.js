var { DeckEncoder } = require('runeterra')
var { request, GraphQLClient } = require('graphql-request')
var unique = (value, index, self) => {
  return self.indexOf(value) === index
}

async function recordGame(data) {
  const endpoint = "https://api.graph.cool/simple/v1/ck2rbhj6p08or0180oh3jb5q3"
  const client = new GraphQLClient(endpoint, { headers: {} })

  const deckcode = data.deckcode
  const existingDecks = await client.request(`query {
    allDecks(filter: {deckcode: "${deckcode}"}, last: 1, orderBy: id_DESC) {
        id
      }
  }`)
  let deckResp = null
  if (existingDecks.length > 0) {
    deckResp = existingDecks.allDecks[0]
  } else {
    deckResp = await recordDeck(deckcode, client)
    deckResp = deckResp.createDeck
  }
  const gameResp = await client.request(`mutation {
    createGame(
      startTime: ${data.startTime},
      endTime: ${data.endTime},
      result: "${data.result}",
      playerName: "${data.playerName}",
      opponentName: "${data.opponentName}") {
        id
      }
  }`)

  await client.request(`mutation {
    addToDeckOnGame(
      deckDeckId: "${deckResp.id}",
      gamesGameId: "${gameResp.createGame.id}"
    ) {
      gamesGame {
        id
      }
    }
  }`)

  await client.request(`mutation {
    addToStreamOnGame(
      streamStreamId: "${currentStream.id}",
      gamesGameId: "${gameResp.createGame.id}"
    ) {
      gamesGame {
        id
      }
    }
  }`)

  return {
    data: {
      'id': gameResp.createGame.id
    }
  }
}

async function recordDeck(deckcode, client) {
  const deckInput = deckcodeToInput(deckcode)
  return await client.request(deckInput)
}

function factionsInputFromDeck(deck) {
  return `[${deck.map((card) => `"${card.faction.shortCode}"`).filter(unique).join(',')}]`
}

function deckcodeToInput(deckcode) {
  const deck = DeckEncoder.decode(deckcode)
  const factionsInput = factionsInputFromDeck(deck)
  const cardsInput = cardsInputFromDeck(deck)
  return `mutation {
    createDeck(factions: ${factionsInput}, deckcode: "${deckcode}", cards: ${cardsInput}) {
      id
    }
  }`
}

function cardsInputFromDeck(deck) {
  return `[${deck.map((card) => cardToInput(card)).join(',')}]`
}

function cardToInput(card) {
  return `{cardID: ${card.id}, setID: ${card.set}, cardCode: "${card.code}", count: ${card.count}, faction: "${card.faction.shortCode}"}`
}
