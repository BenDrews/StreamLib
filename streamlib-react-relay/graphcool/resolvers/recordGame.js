const { fromEvent } = require('graphcool-lib')
const { DeckEncoder } = require('runeterra')

module.exports = async function recordGame(event) {
  const deckcode = event.data.deckcode
  const lib = fromEvent(event)
  const client = lib.api('simple/v1')
  const deck = await client.request(`query {allGames(orderBy: startTime_DESC) {id}}`)
  const existingDecks = await client.request(`query {
    allDecks(filter: {deck: ${deckcode}}, last: 1, orderBy: id_DESC) {
      edges {
        node {
          id
        }
      }
    }
  }`).then((resp) => resp['edges'])
  if (existingDecks.length > 0) {
    const deckID = existingDecks[0]['id']
  } else {
    const deckID = await recordDeck(deckcode, client)
  }

  const gameID = await client.request(`mutation {
    createGame(
      startTime: ${event.data.startTime},
      endTime: ${event.data.endTime},
      result: "${event.data.result}",
      playerName: "${event.data.playerName}",
      opponentName: "${event.data.opponentName}",
      deck: ${deckID}) {
        id
      }
  }`).then((resp) => resp['id'])

  return {
    data: {
      gameID
    }
  }
}

async function recordDeck(deckcode, client) {
  const deckInput = deckcodeToInput(deckcode)
  return await client.request(deckInput).then((resp) => resp['id'])
}

function factionsInputFromDeck(deck) {
  return `[${deck.map((card) => card.faction).filter(onlyUnique).join(',')}]`
}

function deckcodeToInput(deckcode) {
  const deck = DeckEncoder.decode(deckcode)
  const factionsInput = factionsFromDeck(deck)
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
  return `{cardID: ${card.id}, setID: ${card.set}, cardCode: ${card.code}, count: ${card.count}, faction: ${card.faction}}`
}
