/**
 * @flow
 * @relayHash fea628cebe3bf40b8d94ae1511238ba8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type GameList_viewer$ref = any;
export type GameListPageQueryVariables = {|
  channelName?: ?string
|};
export type GameListPageQueryResponse = {|
  +viewer: {|
    +$fragmentRefs: GameList_viewer$ref
  |}
|};
export type GameListPageQuery = {|
  variables: GameListPageQueryVariables,
  response: GameListPageQueryResponse,
|};
*/


/*
query GameListPageQuery {
  viewer {
    ...GameList_viewer_2vNYt5
    id
  }
}

fragment GameList_viewer_2vNYt5 on Viewer {
  allGames(last: 20, orderBy: id_ASC) {
    edges {
      node {
        ...Game_game
        id
        __typename
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
  }
}

fragment Game_game on Game {
  id
  startTime
  endTime
  playerName
  opponentName
  result
  stream {
    preview
    url
    id
  }
  deck {
    deckcode
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "channelName",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 20
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": "id_ASC"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GameListPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "GameList_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "channelName",
                "variableName": "channelName"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GameListPageQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "allGames",
            "storageKey": "allGames(last:20,orderBy:\"id_ASC\")",
            "args": (v1/*: any*/),
            "concreteType": "GameConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "GameEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Game",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "startTime",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endTime",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "playerName",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "opponentName",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "result",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "stream",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Stream",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "preview",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "url",
                            "args": null,
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "deck",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Deck",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "deckcode",
                            "args": null,
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasPreviousPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "startCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "allGames",
            "args": (v1/*: any*/),
            "handle": "connection",
            "key": "GameList_allGames",
            "filters": []
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GameListPageQuery",
    "id": null,
    "text": "query GameListPageQuery {\n  viewer {\n    ...GameList_viewer_2vNYt5\n    id\n  }\n}\n\nfragment GameList_viewer_2vNYt5 on Viewer {\n  allGames(last: 20, orderBy: id_ASC) {\n    edges {\n      node {\n        ...Game_game\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment Game_game on Game {\n  id\n  startTime\n  endTime\n  playerName\n  opponentName\n  result\n  stream {\n    preview\n    url\n    id\n  }\n  deck {\n    deckcode\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e40028f9da365c5b3d5536f08a38b8b4';
module.exports = node;
