import { fromEvent } from 'graphcool-lib'
const { DeckEncoder } = require('runeterra')

module.exports = function recordGame(event) {
  const deckcode = event.data.deckcode
  const lib = fromEvent(event)
  const client = lib.api('simple/v1')
  const {existingDecks} = await client.request(`query {
    allDecks(filters: {deck: ${deckcode}}, last: 1, orderBy: startTime_DESC) {
      edges {
        node {
          id
        }
      }
    }
  }`).then((response) => response['edges'])
  if (existingDecks.length > 0) {
    const deckID = existingDecks[0]['id']
  } else {
    const deckID = recordDeck(deckcode, client)
  }

  const {gameID} = await client.request(`mutation {
    createGame(
      startTime: ${event.data.startTime},
      endTime: ${event.data.endTime},
      result: "${event.data.result}",
      playerName: "${event.data.playerName}",
      opponentName: "${event.data.opponentName}",
      deck: ${deckID}) {
        id
      }
  }`).then((response) => response['id'])

  return {
    data: {
      gameID
    }
  }
}

function recordDeck(deckcode, client) {
  const deckInput = deckcodeToInput(deckcode)
}

function factionsInputFromDeck(deck) {
  return `[${deck.map((card) => card.faction).filter(onlyUnique).join(',')}]`
}

function deckcodeToInput(deckcode) {
  const deck = DeckEncoder.decode(deckcode)
  const factionsInput = factionsFromDeck(deck)
  const cardsInput = cardsInputFromDeck(deck)
  return await client.request(`mutation {
    createDeck(factions: ${factionsInput}, deckcode: "${deckcode}", cards: ${cardsInput}) {
      id
    }
  }`).then((response) => response['id'])
}

function cardsInputFromDeck(deck) {
  return `[${deck.map((card) => cardToInput(card)).join(',')}]`
}

function cardToInput(card) {
  return `{cardID: ${card.id}, setID: ${card.set}, cardCode: ${card.code}, count: ${card.count}, faction: ${card.faction}}`
}
