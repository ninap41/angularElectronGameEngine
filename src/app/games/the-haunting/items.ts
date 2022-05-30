import { randomId, removeInspect, openDialog } from "./utils";

/* ------- !ITEMS-------- */
export const items = {
  blade: {
    id: randomId(),
    name: "Blade",
    combine: "Handle",
    onCombine: (newItem, game) => {
      return game;
    },
    uses: null,
    description:
      "A blade. Too dangerous to touch in current state-- you could hurt yourself.",
    oneTimeUse: false,
    onUse: (user) => {
      user.health -= 2;
      return "You hurt yourself. You should be careful!";
    },
  },
  handle: {
    id: randomId(),
    name: "Handle",
    combine: "Blade",
    onCombine: (newItem, game) => {
      return game;
    },
    uses: null,
    description: "A handle for crafting.",
    oneTimeUse: false,
    onUse: (user) => {
      user.heath -= 2;
      return "Did nothing.";
    },
  },
  mysteriousNote: {
    id: randomId(),
    name: "Mysterious Note",
    combines: "Lighter",
    onCombine: (newItem, game) => {
      return game;
    },
    uses: null,
    description: "A mysterious note that reads 'ghosts haunt this place'.",
    oneTimeUse: false,
    onUse: (user) => {
      return "You read the note";
    },
  },
  flashlight: {
    id: randomId(),
    name: "Flashlight",
    combine: "Battery",
    onCombine: (newItem, game) => {
      return game;
    },
    uses: 4,
    description: "A mysterious note that reads 'ghosts haunt this place'.",
    oneTimeUse: false,
    onUse: (user) => {
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
    onUse: (user) => {
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
