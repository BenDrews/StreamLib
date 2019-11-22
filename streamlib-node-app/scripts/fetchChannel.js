import { request, GraphQLClient } from 'graphql-request'

module.exports = async function fetchChannel(data) {
  const endpoint = "https://api.graph.cool/simple/v1/ck2rbhj6p08or0180oh3jb5q3"
  const client = new GraphQLClient(endpoint, { headers: {} });
  const channelResp = await client.request(`query {
    allChannels(filter: {twitchID: "${data.twitchID}"}, last: 1, orderBy: id_DESC) {
      id
      twitchID
      name
      url
      language
      mature
      logo
    }
  }`)
  const existingChannel = existingDeckEdges.allChannels;
  if (existingChannel.length > 0) {
    return existingChannel[0]
    } else {
    return await recordChannel(data, client)
  }
}

async function recordChannel(data, client) {
  const channelResp = await client.request(`mutation {
    createChannel(
      twitchID: ${data.twitchID},
      url: "${data.url}",
      name: "${data.name}",
      language: "${data.language}",
      mature: "${data.mature}",
      logo: "${data.logo}") {
        id
        twitchID
        name
        url
        language
        mature
        logo
      }
  }`);
  return channelResp.createChannel;
}
