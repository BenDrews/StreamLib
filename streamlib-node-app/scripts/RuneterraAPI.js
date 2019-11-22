const port = 21337;
var request = require('request');
var electron = require('electron');
var unique = (value, index, self) => {
  return self.indexOf(value) === index
}
var status = 'inactive';
var startTime = null;
var deckcode = null;
var cards = null;
var completedGames = [];
var newStatus = null;
var currentGame = {'alliedCardsSeen': null, 'enemyCardsSeen': null};

  // We will look at static and subclassed methods shortly

function requestAPI(endpoint) {
    return new Promise(function(resolve, reject) {
      request.get(`http://localhost:${port}/${endpoint}`, null, function(error, response, body) {
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

function updateStatus() {
    requestAPI('static-decklist').then(data => {
      console.log("Updating status...")
      if (data.DeckCode === null) {
        newStatus = 'inactive'
        console.log(status)
        deckcode = null;
        cards = null;
      } else {
        newStatus = 'active'
        console.log(data)
        deckcode = data.DeckCode
        cards = data.CardsInDeck
      }
      if (newStatus !== status) {
        status = newStatus
        if (status === 'inactive') {
          if (currentStream) {
            completeGame();
          }
        } else {
          if (currentStream) {
            startTime = getStreamTime()
            }
        }
      }
      if (status === 'active') {
        if (!startTime) {
          startTime = getStreamTime()
        }
        updateGame();
      }
    }).catch();
    setTimeout(updateStatus, 1000)
  }

function getStreamTime() {
  if(currentStream) {
    return (new Date()).getTime() - (new Date(currentStream.createdAt)).getTime()
  } else {
    return new Date(0);
  }
}

function updateGame() {
    requestAPI('positional-rectangles').then(data => {
      let playerName = data.PlayerName;
      let opponentName = data.OpponentName;
      let playerCards = data.Rectangles
        .filter(card => card.localPlayer)
        .map(card => card.cardCode)
        .concat(currentGame.playerCards)
        .filter(unique);
      let enemyCards = data.Rectangles
        .filter(card => !card.localPlayer)
        .map(card => card.cardCode)
        .concat(currentGame.opponentCards)
        .filter(unique);

      currentGame = {
        'deckcode': deckcode,
        'playerName': playerName,
        'opponentName': opponentName,
        'alliedCardsSeen': playerCards,
        'enemyCardsSeen': enemyCards,
      }
    });
  }

function completeGame() {
    currentGame.startTime = startTime;
    currentGame.endTime = getStreamTime();
    completedGames.push(currentGame);
    requestAPI('game-result').then(data => {
      currentGame.result = data.LocalPlayerWon ? 'victory' : 'defeat'
      recordGame(currentGame).then(resp => console.log(resp))
      currentGame = {'playerCards': null, 'opponentCards': null};
    })
  }

function updateCards() {
    data = requestAPI('card-positions');
  }
