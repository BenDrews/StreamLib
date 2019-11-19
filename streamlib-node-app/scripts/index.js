var electron = require('electron');
var authTokenStorage = 'StreamLib/auth-token';

var authToken;

function main() {
    var riotAPI = new RuneterraAPI();
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
}

function getAuthToken() {
    return authToken;
}

function printInfo() {
    getInfo(getAuthToken(), function(info) {
        console.log(info);
    });
}

main();
