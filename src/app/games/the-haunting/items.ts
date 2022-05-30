import { Game, Item } from "./types";
import { randomId, removeInspect, openDialog } from "./utils";

/* ------- !ITEMS-------- */
export const items: any = {
  blade: {
    id: randomId(),
    name: "Blade",
    combine: "Handle",
    onCombine: (newItem: any, game: any) => {
      return game;
    },
    uses: null,
    description:
      "A blade. Too dangerous to touch in current state-- you could hurt yourself.",
    oneTimeUse: false,
    onUse: (game: Game) => {
      game.user.health -= 2;
      return "You hurt yourself. You should be careful!";
    },
  },
  handle: {
    id: randomId(),
    name: "Handle",
    combine: "Blade",
    onCombine: (game: Game) => {
      return game;
    },
    uses: null,
    description: "A handle for crafting.",
    oneTimeUse: false,
    onUse: (game: Game) => {
      game.user.health -= 2;
      return "Did nothing.";
    },
  },
  mysteriousNote: {
    id: randomId(),
    name: "Mysterious Note",
    combine: "Lighter",
    onCombine: (newItem: any, game: any) => {
      return game;
    },
    uses: null,
    description: "A mysterious note that reads 'ghosts haunt this place'.",
    oneTimeUse: false,
    onUse: (game: Game) => {
      return "You read the note";
    },
  },
  flashlight: {
    id: randomId(),
    name: "Flashlight",
    combine: "Battery",
    onCombine: (newItem: any, game: Game) => {
      return game;
    },
    uses: 4,
    description: "A mysterious note that reads 'ghosts haunt this place'.",
    oneTimeUse: false,
    onUse: (game: Game) => {
      return "You read the note";
    },
  },
  sharpKnife: {
    id: randomId(),
    name: "Sharp Knife",
    combine: null,
    onCombine: null,
    description: "A sharp knife for many uses",
    oneTimeUse: false,
    onUse: (user: any) => {
      return "You read the note";
    },
  },
};

/**** !COMBINATIONS  *******/

export const itemCombinations = [
  {
    id: "sharpKnife",
    name: "Sharp Knife",
    materials: ["Handle", "Blade"],
    item: items.sharpKnife,
  },
  {
    id: "chargedFlashlight",
    name: "Charged Flashlight",
    materials: ["FlashLight", "battery"],
    item: items.flashlight,
  },
];
