var { request, GraphQLClient } = require('graphql-request')

var currentChannel = null;
async function fetchChannel(data) {
  const endpoint = "https://api.graph.cool/simple/v1/ck2rbhj6p08or0180oh3jb5q3"
  const client = new GraphQLClient(endpoint, { headers: {} });
  console.log(data)
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
  const existingChannel = channelResp.allChannels
  if (existingChannel.length > 0) {
    console.log("Exists")
    console.log(existingChannel[0])
    currentChannel = existingChannel[0];
    return existingChannel[0]
    } else {
      console.log("EXISTS")
      console.log(existingChannel)
    return await recordChannel(data, client)
  }
}

async function recordChannel(data, client) {
  const channelResp = await client.request(`mutation {
    createChannel(
      twitchID: "${data.twitchID}",
      url: "${data.url}",
      name: "${data.name}",
      language: "${data.language}",
      mature: ${data.mature},
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
  currentChannel = channelResp.createChannel;
  return channelResp.createChannel;
}
