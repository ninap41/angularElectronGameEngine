import { randomId, removeInspect, openDialog, bold } from "./utils";
import { items, itemCombinations } from "./items";
import { GameService } from "src/app/views/game.service";
import {
  Attack,
  Chapter,
  CutScene,
  Dialogue,
  Game,
  Inspect,
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
        mode: "continue",
        text: undefined,
        sound: undefined,
      },
      {
        src: "http://placekitten.com/g/200/300",
        mode: "continue",
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

    onEnd: (gs: GameService) => {
      return console.log("this conversation is over!");
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
        "*green-s* You are home with your *CHARNAME*.  *green-e* He's been...  *red-s*pissing you off  *red-e* lately",
      directions: [
        {
          name: "Bathroom",
          description: "Go to the bathroom",
          needsForAccess: null,
          needsForVisibility: null,
          onAction: null,
          newChapter: null,
        },
        {
          name: "Kitchen",
          needsForAccess: {
            bag: "House Key",
            acceptMessage:
              "You used *green*HOUSE KEY*green* to go into the kitchen.",
            denyMessage: "The door is locked",
          },
          needsForVisibility: { bag: "Flashlight" },
          onAction: null,
        },
      ],
      inspects: [
        {
          name: "Look At Diary",
          description: "It's your diary, it's too dark to read.",
          needsForAccess: {
            bag: "Flashlight",
            denyMessage:
              "you pick up the diary and turn it in your hand. nothing out of the ordinary, but it's too dark to see",
            acceptMessage:
              "You read the diary using your flashlight. View diary in bag.",
          },
          items: [],
          instantItem: items.diary,
          needsForVisibility: { bag: "Flashlight" },
          onAction: async (gs, inspect) => {
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
    Kitchen: {
      name: "Kitchen",
      description: "get some cheese",
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
  worldHistory: [],
  bag: [items.blade, items.handle, items.flashlight, items.HouseKey],
  health: 100,
  fear: 0,
  will: 0,
  faith: 0,
  eventHistory: [],
  state: [],
};

/* GAME OVERVIEW

WORLD UI cycles 
  MAIN 
      DIRECTIONS -- some hidden, some shown
        -- lead to new room optional w/ conditions 
        -- onEnter EVENT optional w/ conditions 
        -- onLeave EVENT optional w/ conditions 
      INSPECTS
        -- lead to new room optional w/ conditions 
        -- onChoice can lead to new ITEM, AFFECT, STATE, or EVENT.
        

  EVENT
    DIALOGUE ((START) -> (END)) --- discovery ONEND bag, new DIRECTION, new EVENT,
    BATTLE ((START) -> (END)) --- discovery ONEND bag, new DIRECTION, new EVENT,
    DISCOVERY --- discovery ONEND bag, new DIRECTION, new EVENT,
    CUTSCENE ((START) -> (END)) --> discovery ONEND bag, new DIRECTION, new EVENT,
    PUZZLE
      ((START) || (GIVEUP) -> (END)) --> discovery ONEND bag, new DIRECTION, new EVENT,
//////// HIDDEN - AFFECTS story affects 
EVENT HISTORY
STATS 
    HEALTH
    WILL
    FEAR
    FAITH
    STATE
        affect state  FEAR & FAITH & WILL based.
        INEBRIATED  Timed?.
        COLD perTurn turnTimeout
        HOT perTurn turnTimeout
        DEPRESSED - makes you more unlikable to be around. 
        FRIGHTENED - makes you susceptible to paranormal attacks
        CURSED - influences an ending
        SCARED SHITLESS - makes you susceptible to instant death
        IN GOOD COMPANY - have an ally during attacks 
BAG * bag interface *
  bag interface can combine. Going to bag does NOT stop timer.
HELP

  
STORY OVERVIEW
Chris is a 21 year old kid who didn't have a lot going for him. 
His parents died of mysterious circumstances

Bathroom

Bedroom
   Inspect COMPUTER hidden by CLUE : SCRATCHES
   Inspect CELLPHONE hidden by Affect READJOURNAL : SCRATCHES

EVENT 'CELLPHONE'
    FRONT DOOR
    INSPECTS: 
        CALL GIRLFRIEND (obtain AFFECT : CALLED SADIE ) or 
        READ TEXT or 
        LOOK AT PHOTOS or 
        CLOSE PHONE

ROOM: BATHROOM
    INSPECT: LOOK IN MIRROR leads to IMMEDIATE EVENT spook and fear increases by 12

INSPECT answer door hidden by AFFECT: DOORBELLRUNG

alternate DIALOGUE EVENTS
  GIRLFRIEND  conditions
  PASTOR HEISENBERG



pastor Door Affects: 'chrisClosedDoorOnPastor'



NEXT CHAPTERS: */
