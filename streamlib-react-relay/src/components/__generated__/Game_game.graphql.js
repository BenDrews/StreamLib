/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Game_game$ref: FragmentReference;
declare export opaque type Game_game$fragmentType: Game_game$ref;
export type Game_game = {|
  +id: string,
  +startTime: ?number,
  +endTime: ?number,
  +playerName: ?string,
  +opponentName: ?string,
  +result: ?string,
  +stream: ?{|
    +preview: ?string,
    +url: ?string,
  |},
  +deck: ?{|
    +deckcode: ?string
  |},
  +$refType: Game_game$ref,
|};
export type Game_game$data = Game_game;
export type Game_game$key = {
  +$data?: Game_game$data,
  +$fragmentRefs: Game_game$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Game_game",
  "type": "Game",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
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
        }
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '1fff2964884b7f230230963b0199413f';
module.exports = node;
