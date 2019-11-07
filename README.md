# StreamLib

## Value Proposition
As a new player, getting into the competitive card game space can be tough. Once you’ve tackled the initial task of learning all the cards and keywords, you then need to learn the actual archetypes present in the metagame and how each one operates. It’s straightforward enough to find the decklists people are running, but how does one actually learn the decision making for each matchup? Right now learning a new deck involves guerilla aggregation of data from sources all over the net, Reddit posts, forum threads, and if you’re lucky, instructive Youtube videos.

StreamLib aims to add Twitch vods to the list of informative gameplay sources, by offering a catalogued, searchable store of Twitch vod timestamps. Our website will offer players the ability to input a specific matchup, for example Ionia/Demacia vs. Freljord/Shadow Isles, and find a list of links to each vod timestamp that showcases this exact matchup. For this contest we plan on making our timestamp collection searchable by game duration, outcome, cards played, cards in deck, streamer featured, and as a stretch goal deck archetype. Twitch vods have been historically difficult to parse for specific content and thus underutilized as a learning resource. By creating StreamLib, we will give Legends of Runeterra players a new surface to learn from, as well as help drive additional traffic to streamers.

## Component Overview
Twitch extension
- Uses data from the Riot API to mark timestamps in livestreams and tag them.
- Uploads complete timestamps to the server.
- Sends a notice to the server when the stream goes offline.
- Creates stream makers describing each game.

Web surface (React/Relay application)
- Landing page.
- Search results page.
- Served by simple NodeJS server.

GraphQL Server (Golang)
- Processes timestamps from clients.
- When the vods become available, publishes the relevant timestamps.
- Fulfills search requests.

## Technical Details
- A streamer downloads our Twitch extension and connects it to their Legends of Runeterra account and their twitch account.
When the streamer begins streaming, we periodically us the “card positions” client API to determine when a game starts. At this point, we associate the start of the game with current stream timestamp and use the “active deck” client API endpoint to pull the currently active decklist. 
- As the game goes on, we continue to use the “card positions” API to figure out what cards are currently in hand or in play. This serves multiple purposes:
- We can keep track of approximately when a card from either player’s deck is played, to give stream timestamps of when cards are played.
- We can keep track of the cards in the opponent’s deck to try to guess at the “archetype” of the opponent’s deck.
- When the “card positions” API starts returning null values, we mark the current game as completed, and use the “game result” API to get the outcome. At this point, we associate the end of the game with current stream timestamp and send this information to the server.
- The bundle that we send to the server includes the starting timestamp, ending timestamp, deck used, opponent deck information, and match result to our server. The server validates the request and stores it into a database.
- Once the stream goes offline, the server will begin polling the videos associated with the channel to find the matching VOD. Once it verifies the availability of the VOD, information for this match will be accessible through our web interface to all users. 
- The web interface will support searching by streamer, by card, or by deck archetype, providing information of the streamer’s deck, opposing deck archetype, and timestamped links to Twitch VODs (when available) so the user can watch the match on Twitch.
- As more endpoints are added to the client API, we can make the features more rich and powerful to provide a better experience for the user.
