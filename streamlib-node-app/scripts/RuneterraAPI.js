const port = 21337;

var request = require('request');

class RuneterraAPI {
  constructor() {
    this.status = 'inactive';
    this.deckCode = null;
    this.cards = null;
    this.completedGames = [];
  }
  // We will look at static and subclassed methods shortly

  requestAPI(endpoint) {

    let req = request.get(`http://localhost:${port}/${endpoint}`)
      .on('response', function(response) {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type']) // 'image/png'
        return response.JSON;
      })
      .on('error', function(error) {
        console.log(error)
      });
    console.log(req);
    return req;
  }

  async updateStatus() {
    let data = await this.requestAPI('static-decklist');
    if (data.DeckCode === null) {
      let status = 'inactive'
      console.log(status)
      let deckcode = null;
    } else {
      let status = 'active'
      console.log(data)
      let deckcode = data.DeckCode
      let cards = data.CardsInDeck
    }
    if (this.status !== status) {
      if (status === 'active') {
        this.initGame()
      } else {
        this.completeGame()
      }
    }
  }

  initGame() {
    let data = requestAPI('card-positions');
    let playerName = data.PlayerName;
    let opponentName = data.OpponentName;
    let playerCards = data.Rectangles.filter(card => card.localPlayer).map(card => card.cardCode);
    let enemyCards = data.Rectangles.filter(card => !card.localPlayer).map(card => card.cardCode);

    this.currentGame = {
      'playerName': playerName,
      'opponentName': opponentName,
      'playerCards': playerCards,
      'enemyCards': enemyCards,
    }
  }

  completeGame() {
    this.completedGames.push(this.currentGame);
    this.currentGame = null;
  }

  updateCards() {
    data = requestAPI('card-positions');

  }
}

module.exports = RuneterraAPI;
