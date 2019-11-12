const { DeckEncoder } = require('runeterra')

module.exports = function recordGame(event) {
  const deckcode = data.event.deckcode
  const deck = DeckEncoder.decode(deckcode)
  const factions = deck.map((card) => card.faction).filter(onlyUnique)
  const factionsInput = `[${factions.join(',')}]`
  const cardsInput = `[${deck.map((card) => `{cardID: ${card.id}, setID: ${card.set}, cardCode: ${card.code}, count: ${card.count}, faction: ${card.faction}}`).join(',')}]`
  const deckInput =

  return {
    data: {
      number
    }
  }
}
