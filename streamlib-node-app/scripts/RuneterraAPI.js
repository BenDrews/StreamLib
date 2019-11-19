const port = 21337;


class RiotAPI {
  constructor() {
    this.status = 'inactive';
    this.deckCode = null;
    this.cards = null;
    this.completedGames = [];
  }
  // We will look at static and subclassed methods shortly

  requestAPI(endpoint) {
    var request = new Request(`http://localhost:${port}/${endpoint}`);
    var data = fetch(request).then(function(response) {
      return response.JSON();
    });
  }

  updateStatus() {
    var data = requestAPI('static-decklist');
    if (data.DeckCode === null) {
      var status = 'inactive'
      console.log(status)
      var deckcode = null;
    } else {
      var status = 'active'
      var deckcode = data.DeckCode
      var cards = data.CardsInDeck
    }
    if (this.status !== status) {
      if (status === 'active') {
        initGame()
      } else {
        completeGame()
      }
    }
  }

  initGame() {
    var data = requestAPI('card-positions');
    var playerName = data.PlayerName;
    var opponentName = data.OpponentName;
    var playerCards = data.Rectangles.filter(card => card.localPlayer).map(card => card.cardCode);
    var enemyCards = data.Rectangles.filter(card => !card.localPlayer).map(card => card.cardCode);

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

module.exports = {
    RiotAPI: RiotAPI
}
