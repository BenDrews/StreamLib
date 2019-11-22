var electron = require('electron');
var authTokenStorage = 'StreamLib/auth-token';

var authToken;

const sampleGame = {
  'startTime': 0,
  'endTime': 0,
  'result': 'victory',
  'playerName': 'Xemacs',
  'opponentName': 'Entropy',
  'deckcode': 'CEBAKAIFEISDCMRVA4AQAFQ5D4QSMMZWAEBACBJLGYAA',
}

function main() {
    console.log('Running');
    var query = electron.remote.getGlobal('authQuery');
    if (query) {
        console.log('Found query');
        var accessToken = query.access_token;
        console.log('Access token: ' + accessToken);
        window.localStorage.setItem(authTokenStorage, accessToken);
    }
    authToken = window.localStorage.getItem(authTokenStorage);
    if (authToken) {
        document.getElementById('auth').innerHTML = 'Authenticated.';
    }
    else {
        document.getElementById('auth').innerHTML = 'Not authenticated.';
    }
    updateStatus()
}

function getAuthToken() {
    return authToken;
}

function printChannelInfo() {
    getChannelInfo(getAuthToken(), function(info) {
        console.dir(info);
    });
}

function printVideoInfo() {
    getVideoInfo(document.getElementById("channelId").value, false, function(info) {
        console.dir(info);
    });
}

function startStreamListenerForChannel(channelId){
    var started = false;
    var delay = 5000;
    setInterval(function() {
        getLiveStreamInfo(channelId, function(info) {
            if (info != null && !started) {
                onStreamStart();
                started = true;
            }
            if (info == null && started) {
                onStreamEnd();
                started = false;
            }
        });
    }, delay);
}

// Make sure to call this function only once
function startStreamListener() {
    var token = getAuthToken();
    getChannelInfo(token, function(info) {
        var channelId = info.twitchID;
        startStreamListenerForChannel(channelId);
    });
}

main();
