import { randomId, removeInspect, openDialog, bold } from "./utils";
import { items, itemCombinations } from "./items";
import { GameService } from "src/app/views/game.service";
import {
  Chapter,
  CutScene,
  Dialogue,
  Game,
  Inspects,
  Item,
  State,
  User,
} from "./types";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

/* ------- !EVENTS ----- */

export const cutScenes: CutScene[] = [
  {
    music: null,
    name: "testScene",
    frames: [
      {
        src: "http://placekitten.com/g/200/300",
        continue: true,
        text: undefined,
        sound: undefined,
      },
      {
        src: "http://placekitten.com/g/200/300",
        continue: true,
        text: undefined,
        sound: undefined,
      },
    ],
    onEnd: () => {},
  },
];

export const dialogue: Dialogue[] = [
  {
    music: undefined,
    name: "testDialogue",
    turns: [
      {
        character: "Chris",
        emotion: "normal",
        content:
          "Hey this is chris. I don't think much of myself to be honest.",
        position: "top",
        sound: undefined,
      },
      {
        character: " Pastor Heisenberg",
        emotion: "inquisitive",
        content: "Is it cause you're haunted by a demon?",
        position: "bottom",
        sound: undefined,
      },
      {
        character: "Chris",
        emotion: "angry",
        content: "Who are you?",
        position: "top",
        sound: undefined,
      },
      {
        character: "Pastor Heisenberg",
        emotion: "inquisitive",
        content: "Your worst nightmare bub.",
        position: "bottom",
        sound: undefined,
      },
      {
        character: "NONE",
        content: "what will you do?",
        position: "center",
        sound: undefined,
        prompt: {
          content: "Will You Take The Item?",
          choices: [
            {
              id: "1",
              content: "take item",
              onClick: (game: Game) => {
                game.user.bag.push(items.blade as unknown as Item);
              },
            },
          ],
        },
      },
    ],
    items: [undefined, undefined],
    onEnd: (game: Game) => {
      console.log("ended dialogue");
      game.user.event = null;
      game.state = State.room;
    },
  },
];

export const chapter1: Chapter<any, any> = {
  cutScenes: cutScenes,
  dialogue: dialogue,
  itemCombinations: itemCombinations,
  conditions: [], // conditions that influence story!
  startingPoint: "Bedroom",
  rooms: {
    Bedroom: {
      name: "Bedroom",
      // img: "assets/the-perfect-murder/door.jpeg",
      description:
        "You are home with your boyfriend. He's been... pissing you off lately",
      directions: [
        {
          name: "Bathroom",
          description: "It's your diary, there is a band constricted by a lock",
          needsForAccess: null,
          needsForVisibility: null,
          onAction: null,
        },
        {
          name: "Kitchen",
          needsForAccess: {
            bag: "House Key",
            acceptMessage:
              "You used *green*HOUSE KEY*green* to go into the kitchen.",
          },
          needsForVisibility: { bag: "Flashlight" },
          onAction: null,
        },
        {
          name: "Living Room",
          needsForAccess: null,
          needsForVisibility: null,
          onAction: null,
        },
      ],
      inspects: [
        {
          name: "Look At Diary",
          description: "It's your diary, there is a band constricted by a lock",
          needsForAccess: {
            bag: "Flashlight",
            denyMessage: "You can't open the diary.",
            acceptMessage: "You're able to read the diary.",
          },
          item: items.mysteriousNote,
          needsForVisibility: { bag: "Flashlight" },
          onAction: (game: Game, inspect: Inspects, accessed: boolean) => {
            if (accessed) {
              if (inspect.instantItem) {
                game.user.bag.push(inspect.instantItem);
                game.acceptMessage += `<br><br> You found  ${bold(
                  inspect.instantItem.name
                )}`;
              }
              game = removeInspect(game, inspect);
              return game;
            } else {
              return game;
            }
          },
        },
      ],
    },
    Bathroom: {
      name: "Bathroom",
      description: "You're in the bathroom. Do you have to go?",
      directions: [
        {
          name: "Bedroom",
          needsForAccess: null,
          needsForVisibility: null,
          onAction: null,
        },
      ],
      inspects: [],
    },
  },
};

/** GAME *** */
export var haunting = {
  world: { chapter1: chapter1 },
};

export var hauntingUser: User = {
  // img: "assets/the-perfect-murder/avatar.jpg",
  worldPoint: null,
  history: [], //worldPointHistory
  bag: [items.blade, items.handle, items.flashlight], // Inventory
  affects: [], //statusAffects
  health: 100,
  fear: 0,
  faith: 0,
};
