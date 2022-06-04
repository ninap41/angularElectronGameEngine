import { randomId, removeInspect, openDialog, bold } from "./utils";
import { items, itemCombinations } from "./items";
import { GameService } from "src/app/views/game.service";
import {
  Attack,
  Chapter,
  CutScene,
  Dialogue,
  Game,
  Inspects,
  Item,
  Prompt,
  State,
  SuddenEvent,
  User,
} from "./types";

/* ------- !EVENTS ----- */

export const suddenEvent: SuddenEvent[] = [
  {
    type: State.suddenEvent,
    intro: ["a thing pops out in front of a thing", "it tries to attack you!"],
    timed: true,
    time: 5,
    name: "Test Sudden Event",
    description: "there is a thing before you. ",
    prompts: [
      {
        content: "what do you do?",
        choices: [
          {
            id: 9,
            name: "",
            content: "what do you do?",
            needsForAccess: null,
            needsForVisibility: null,
            onAction: (gs: GameService) => {
              console.log("gameOver");
            },
          },
        ],
      },
    ],
    onTimeOut: (gs: GameService) => {
      return console.log("timeout");
    },
    outro: ["shit was easy!"],
  },
];

export const cutScenes: CutScene[] = [
  {
    music: null,
    type: State.cutScene,
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

export const attacks: Attack[] = [
  {
    name: "Apparition",
    intro: ["Hello..."],
    type: State.attack,
    enemy: null,
    outro: ["the apparition dissipates"],
  },
];

export const dialogue: Dialogue[] = [
  {
    name: "testDialogue",
    type: State.dialogue,
    turns: [
      {
        music: null, // optional
        sound: null, // optional
        character: "Chris",
        emotion: "normal",
        content:
          "Hey this is chris. I don't think much of myself to be honest.",
        position: "top",
      },
      {
        character: " Pastor Heisenberg",
        emotion: "inquisitive",
        content: "Is it cause you're haunted by a demon?",
        position: "bottom",
      },
      {
        character: "Chris",
        emotion: "angry",
        content: "Who are you?",
        position: "top",
      },
      {
        character: "Pastor Heisenberg",
        emotion: "inquisitive",
        content: "Your worst nightmare bub.",
        position: "bottom",
      },
      {
        character: "Pastor Heisenberg",
        content: "what will you do?",
        position: "center",
        prompt: {
          content: "will you take this blessed blade?",
          choices: [
            {
              id: 1,
              content: "take item",
              onAction: (gs: GameService) => {
                gs.addItem(items.blade);
              },
            },
          ],
        },
      },
    ],
    items: [undefined, undefined],

    onEnd: () => console.log("this conversation is over!"),
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
        },
      ],
      inspects: [
        {
          name: "Look At Diary",
          description: "It's your diary, there is a band constricted by a lock",
          needsForAccess: {
            bag: "Flashlight",
            denyMessage: "You read the diary the diary.",
            acceptMessage: "You're able to read the diary.",
          },
          item: items.mysteriousNote,
          needsForVisibility: { bag: "Flashlight" },
          onAction: (inspect: Inspects, accessed: boolean, gs: GameService) => {
            if (accessed) {
              if (inspect.instantItem) {
                gs.game.user.bag.push(inspect.instantItem);
                gs.game.acceptMessage += `<br><br> You found  ${bold(
                  inspect.instantItem.name
                )}`;
              }
              gs.game = removeInspect(gs.game, inspect);
            }
            return;
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
  world: { chapter1: chapter1, chapter2a: chapter1 },
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
