import { CLIENT_ID, CLIENT_SECRET } from './TwitchConstants'
const https = require('https');
const querystring = require('querystring');

function twitchApiRequest(twitch_path, data) {
    return new Promise((resolve, reject) => {
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
            res.on('data', function(chunk) {
                resolve(chunk);
            });
        });

        // Send request
        req.write(data);
        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    });
}

export function getAuthToken(callback) {
    // Build Twitch API query string
    const post_data = querystring.stringify({
        'client_id' : CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'client_credentials',
        // 'scope' : ''
    });
    return twitchApiRequest('/oauth2/token', post_data, callback);
}