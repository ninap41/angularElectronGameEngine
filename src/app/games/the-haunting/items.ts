import { GameService } from "src/app/views/game.service";
import { Game, Item } from "./types";
import { randomId, removeInspect, openDialog } from "./utils";
/* 

Combos
blade + handle
      |
      |_______sharp knife + ?
          
kindle + wood
        |
        |_____Fire
               fire + letter)
                    |
                    |____burnt letter
wood + knife

*/
/* ------- !ITEMS-------- */
export const items: any = {
  blade: {
    id: randomId(),
    name: "Blade",
    combine: "Handle",
    onCombine: async (game: GameService) => {
      return game;
    },
    uses: null,
    description:
      "A blade. Too dangerous to touch in current state-- you could hurt yourself.",
    oneTimeUse: false,
    onUse: (game: GameService) => {
      // game.user.health -= 2;
      return "You hurt yourself. You should be careful!";
    },
    useConditions: (gs: GameService): boolean => true,
  },
  HouseKey: {
    id: randomId(),
    name: "House Key",
    combine: null,
    onCombine: (game: GameService) => {
      return game;
    },
    uses: null,
    description: "Does this shit go to the kitchen?.",
    oneTimeUse: false,
    onUse: async (gs: GameService, item?: Item, conditionsToUse?: boolean) => {
      // game.user.health -= 2;
      if (conditionsToUse) {
        await gs.displayQuickMessage(
          "Maybe there are more rooms you can use this on."
        );
      } else {
        await gs.displayQuickMessage(
          "Can't use this item right now. Try walking up to a door to use it."
        );
      }
    },
    useConditions: (gs: GameService, item?: Item): boolean => false, // only use on traverse
  },
  handle: {
    id: randomId(),
    name: "Handle",
    combine: "Blade",
    onCombine: async (game: GameService) => {
      return game;
    },
    uses: null,
    description: "A handle for crafting.",
    oneTimeUse: false,
    onUse: (game: GameService, item?: Item) => {},
    useConditions: (gs: GameService): boolean => true,
  },
  diary: {
    id: randomId(),
    name: "Childhood Diary",
    combine: "Lighter",
    onCombine: (game: GameService, item?: Item) => {
      return game;
    },
    uses: null,
    description: "Your childhood diary is tattered ",
    longDescriptions: [""],
    oneTimeUse: false,
    onUse: (game: GameService, item?: Item) => {
      return "You read the note";
    },
    useConditions: (gs: GameService): boolean => true,
  },
  mysteriousNote: {
    id: randomId(),
    name: "Mysterious Note",
    combine: "Lighter",
    onCombine: (game: GameService, item?: Item) => {
      return game;
    },
    uses: null,
    description: "A mysterious note that reads 'ghosts haunt this place'.",
    oneTimeUse: false,
    onUse: (game: GameService, item?: Item, conditionsToUse?: boolean) => {
      return "You read the note";
    },
    useConditions: (gs: GameService): boolean => true,
  },
  flashlight: {
    id: randomId(),
    name: "Flashlight",
    combine: "Battery",
    onCombine: (newItem: any, game: Game) => {
      return game;
    },
    description: "A mysterious note that reads 'ghosts haunt this place'.",
    uses: 5, //when hits one it is empty
    replenishable: true,
    oneTimeUse: false,
    onUse: (game: GameService, item?: Item, conditionsToUse?: boolean) => {
      return "You read the note";
    },
    useConditions: (gs: GameService): boolean => true,
  },
  sharpKnife: {
    id: randomId(),
    name: "Sharp Knife",
    combine: null,
    onCombine: null,
    description: "A sharp knife for many uses",
    oneTimeUse: false,
    onUse: (game: GameService, item?: Item) => {
      return "You read the note";
    },
    useConditions: (gs: GameService): boolean => true,
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
