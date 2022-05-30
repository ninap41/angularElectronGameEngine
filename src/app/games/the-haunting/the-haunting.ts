import { randomId, removeInspect, openDialog, bold } from "./utils";
import { items, itemCombinations } from "./items";
import { Chapter, CutScene, Dialogue, Game, State } from "./types";

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
      },
    ],
    items: [undefined, undefined],
    prompts: [],
    onEnd: (game: Game) => {
      console.log("ended dialogue");
      game.user.event = null;
      game.state = State.room;
    },
  },
];

/* ------- !ITEMS-------- */

/**** !COMBINATIONS  *******/

export const chapter1: Chapter<any, any> = {
  // chapter1
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
          onAction: (
            game: { user: { bag: any[]; acceptMessage: string } },
            inspect: { item: { name: any } },
            accessed: any
          ) => {
            if (accessed) {
              if (inspect.item) {
                game.user.bag.push(inspect.item);
                game.user.acceptMessage += `<br><br> You found  ${bold(
                  inspect.item.name
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
  user: {
    state: "default", // room, shopkeep, battle, event, cutscene, will probably only have room and event for now.
    chapter: "chapter1",
    // img: "assets/the-perfect-murder/avatar.jpg",
    worldPoint: null,
    history: [], //worldPointHistory
    bag: [items.blade, items.handle, items.flashlight], // Inventory
    event: null,
    importantMarker: [], // storyPoints that can influence events or inspects
    affects: [], //statusAffects

    health: 100,
    fear: 0,
    faith: 0,
  },
  world: { chapter1: chapter1 },
};
