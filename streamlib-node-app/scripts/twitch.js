var request = require('request');

var streamID = null;

function makeHeaders(token) {
    var headers = {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'yh4epzuv85ntcpyl6s38ompr7h5msa'
    };
    if (token) {
        headers['Authorization'] = 'OAuth ' + token;
    }
    return headers;
}

function onStreamStart() {
  const channel = getChannelInfo(token, recordChannel)
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
            logo: b["logo"]
        };
        return callback(resp);
    });
}

function getLiveStreamInfo(channelID, callback) {
  var options = {
      url: 'https://api.twitch.tv/kraken/stream/' + channelID,
      headers: makeHeaders(null)
  }
  request.get(options, function (error, response, body) {
      console.log('Get channel status code ' + response.statusCode);
      var bs = JSON.parse(body);
      var vs = bs["stream"];
      var resp = {
        twitchID: b["_id"],
        game: b["game"],
        delay: b["delay"],
        createdAt: b["created_at"],
        channelID: b["channel"]["_id"],
        preview: b["preview"]["medium"]
      };
      callback(resp);
  });
}

function getVideoInfo(channelID, mustBeRecording, callback) {
    var options = {
        url: 'https://api.twitch.tv/kraken/channels/' + channelID + '/videos',
        headers: makeHeaders(null)
    }
    request.get(options, function (error, response, body) {
        console.log('Get channel status code ' + response.statusCode);
        var bs = JSON.parse(body);
        var vs = bs["videos"];
        var recordingVideos = [];
        for (var i = 0; i < vs.length; i++) {
            var v = vs[i];
            if (!mustBeRecording || v["status"] === 'recording') {
                recordingVideos.push(v);
            }
        }
        var resp = [];
        for (var i = 0; i < recordingVideos.length; i++) {
            var b = recordingVideos[i];
            var respVid = {
                twitchID: b["_id"],
                url: b["url"],
                title: b["title"],
                channelID: b["channel"]["_id"],
                preview: b["preview"]["medium"]
            };
            resp.push(respVid);
        }
        callback(resp);
    });
}
