const port = 21337;

var request = require('request');

class RuneterraAPI {
  constructor() {
    this.status = 'inactive';
    this.deckcode = null;
    this.cards = null;
    this.completedGames = [];
  }
  // We will look at static and subclassed methods shortly

  requestAPI(endpoint) {
    return new Promise(function(resolve, reject) {
      request.get(`http://localhost:${port}/${endpoint}`, null, function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        if (error !== null) {
          reject(error);
        } else {
          console.log(body);
          resolve(JSON.parse(body));
        }
      });
    })
  }

  updateStatus() {
    this.requestAPI('static-decklist').then(data => {
      if (data.DeckCode === null) {
        var status = 'inactive'
        console.log(status)
        var deckcode = null;
        var cards = null;
      } else {
        var status = 'active'
        console.log(data)
        var deckcode = data.DeckCode
        var cards = data.CardsInDeck
      }
      if (this.status !== status) {
        this.status = status
        this.deckcode = deckcode
        this.cards = cards
        console.log("WE HERE")
        if (status === 'inactive') {
          this.completeGame();
        }
      }
      if (status === 'active') {
        this.updateGame();
      }
    });
  }

  updateGame() {
    this.requestAPI('positional-rectangles').then(data => {
      let playerName = data.PlayerName;
      let opponentName = data.OpponentName;
      console.log("DATA");
      console.log(data);
      let playerCards = data.Rectangles.filter(card => card.localPlayer).map(card => card.cardCode);
      let enemyCards = data.Rectangles.filter(card => !card.localPlayer).map(card => card.cardCode);

      this.currentGame = {
        'playerName': playerName,
        'opponentName': opponentName,
        'playerCards': playerCards,
        'enemyCards': enemyCards,
      }
    });
  }

  completeGame() {
    this.completedGames.push(this.currentGame);
    this.currentGame = null;
  }

  updateCards() {
    data = this.requestAPI('card-positions');
  }
}

module.exports = RuneterraAPI;
