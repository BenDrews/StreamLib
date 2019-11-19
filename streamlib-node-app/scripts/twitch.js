var request = require('request');

function makeHeaders(token) {
    return {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'yh4epzuv85ntcpyl6s38ompr7h5msa',
        'Authorization': 'OAuth ' + token
    };
}

function getChannelInfo(token, callback) {
    var options = {
        url: 'https://api.twitch.tv/kraken/channel',
        headers: makeHeaders(token)
    }
    request.get(options, function (error, response, body) {
        console.log('Get channel status code ' + response.statusCode);
        var b = JSON.parse(body);
        var resp = {
            twitchID: b["_id"],
            url: b["url"],
            name: b["display_name"],
            language: b["broadcaster_language"],
            mature: b["mature"],
            logo: b["logo"],
            streams: 
        };
        callback(resp);
    });
}
