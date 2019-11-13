import { CLIENT_ID, CLIENT_SECRET } from 'TwitchConstants'
var https = require('https');

function twitchApiRequest(twitch_path, data) {
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
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // Send request
    req.write(data);
    req.end();
}

function getAuthToken() {
    // Build Twitch API query string
    var post_data = querystring.stringify({
        'client_id' : CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'client_credentials',
        // 'scope' : ''
    });
    twitchApiRequest('/oauth2/token', post_data);
}