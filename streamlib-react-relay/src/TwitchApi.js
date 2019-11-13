import { CLIENT_ID, CLIENT_SECRET } from './TwitchConstants.js'
var https = require('https');
var querystring = require('querystring');

function twitchApiRequest(twitch_path, data, callback) {
    // POST options
    var options = {
        host: 'id.twitch.tv',
        port: '443',
        path: twitch_path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    // Create request
    var req = https.request(options, function(res) {
        console.log("get resp");
        res.setEncoding('utf8');
        res.on('data', callback);
    });

    console.log("send req");
    // Send request
    req.write(data);
    req.on('error', (e) => {
        console.log(e);
    });
    req.end();
}

export function getAuthToken(callback) {
    // Build Twitch API query string
    var post_data = querystring.stringify({
        'client_id' : CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'client_credentials',
        // 'scope' : ''
    });
    twitchApiRequest('/oauth2/token', post_data, callback);
}