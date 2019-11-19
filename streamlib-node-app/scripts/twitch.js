var request = require('request');

function makeHeaders(token) {
    return {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'yh4epzuv85ntcpyl6s38ompr7h5msa',
        'Authorization': token
    };
}

export function getInfo(token) {
    var channelID;
    var options = {
        url: 'https://api.twitch.tv/kraken/channel',
        headers: makeHeaders(token);
    }
    request.get(options, function (error, response, body) {
        var bodyObject = JSON.parse(body);
        channelID = bodyObject["_id"];
    });
    return channelID;
}