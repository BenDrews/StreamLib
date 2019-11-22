import { request, GraphQLClient } from 'graphql-request'

module.exports = async function recordStream(data) {
  const endpoint = "https://api.graph.cool/simple/v1/ck2rbhj6p08or0180oh3jb5q3"
  const client = new GraphQLClient(endpoint, { headers: {} });
  const streamResp = await client.request(`mutation {
    createStream(
      twitchID: ${data.twitchID},
      url: "${data.url}",
      title: "${data.title}",
      preview: "${data.preview}") {
        id
        twitchID
        title
        preview
      }
  }`);
  await client.request(`mutation {
    addToChannelOnStream(
      channelChannelId: "${data.channelID}",
      streamsStreamId: "${streamResp.createStream.id}"
    ) {
      streamsStream {
        id
      }
    }
  }`)
  return streamResp.createStream;
}

async function recordChannel(data, client) {

}
