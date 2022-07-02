import { GameService } from "src/app/views/game.service";

export interface Events {
  cutScenes: Map<string, CutScene>;
  dialogue?: Map<any, Dialogue>;
  attack?: Map<any, Attack>;
}

export enum State {
  dialogue = "Dialogue",
  cutScene = "CutScene",
  attack = "Attack",
  room = "Room",
  puzzle = "Puzzle",
  suddenEvent = "SuddenEvent",
  gameOver = "Game Over",
}

export interface Enemy {}

export interface SuddenEvent {
  type: State.suddenEvent;
  intro?: string[];
  timed?: boolean;
  time?: number;
  name: string;
  description: string;
  prompts: Prompt[] | Choice[];
  onTimeOut?: (gs: GameService) => {} | void;
  outro?: string[];
}

export interface Attack {
  type: State.attack;
  name: string;
  intro?: string[];
  enemy?: Enemy | null;
  outro?: string[];
}

export interface GameOver {
  type: State.gameOver;
}
export interface Puzzle {
  type: State.puzzle;
}

export interface CutScene {
  music?: string | null;
  type: State.cutScene;
  name: string;
  frames?: Frames[] | null;
  onEnd: (gs: GameService) => void | any;
}
export interface Frames {
  src?: string;
  mode: string;
  text?: null;
  sound?: null;
  prompt?: (choices: Choice[]) => {};
}

export interface Dialogue {
  name?: string | null;
  type: State.dialogue;
  music?: string | null;
  turns: Turns[] | null;
  items?: Item[] | null;
  prompts?: any[];
  onEnd: (gs: GameService) => void | any;
}
export interface Turns {
  music?: string | null;
  soundEffect?: string | null;
  character?: string | null;
  emotion?: string | null;
  content?: string | null;
  sound?: null;
  position?: string | null;
  prompt?: Prompt;
}

export interface Prompt {
  content: string;
  needsForAccess?: NeedsForAccess;
  needsForVisibility?: NeedsForVisibility;
  choices: Choice[];
}

export interface Choice {
  id?: number;
  name?: string;
  needsForAccess?: NeedsForAccess;
  needsForVisibility?: NeedsForVisibility;
  content: string;
  onAction?: (gs: GameService) => void | any;
}

export interface Game {
  world: Chapter<any, any>;
  title: string;

  chapter: string;
  genericMessage?: string | null;
  denyMessage?: string | null;
  acceptMessage?: string | null;
  createdMessage?: string | null;
  user: User;

  state: State;
  importantMarker: string[];
  event?: Dialogue | CutScene | Attack | Puzzle;
}

export interface Clue {}
export interface CharacterState {}
export interface User {
  worldHistory: Direction[];
  eventHistory: string[];
  worldPoint: Direction;
  state: Affect[]; //affects the person
  clues?: Clue[];
  bag?: Item[] | null;
  health: number;
  fear?: number;
  will?: number;
  faith?: number;
}

export interface Room {
  name: string;
  img?: string;
  description: string;
  directions?: Direction[] | null;
  inspects?: Inspect[] | null;
  onEnter?: (game: GameService) => void | any;
  onLeave?: (game: GameService) => void | any;
}

export interface Direction {
  name: string;
  description?: string | null;
  needsForAccess?: NeedsForAccess | null;
  denyMessage?: string | null;
  needsForVisibility?: NeedsForVisibility | null;
  onAction?: (game: GameService) => void | any;
  eventHistory?: string;
  inspects?: Inspect[] | null;
  newChapter?: string;
  img?: string | null;
}

export interface Inspect {
  name: string;
  description: string;
  chanceOfSuccess?: (gs: GameService, inspect: any) => {} | void;
  items: Item[];
  instantItem: Item;
  needsForAccess?: NeedsForAccess;
  needsForVisibility?: NeedsForVisibility;
  onAction?: (game: GameService, inspect: Inspect) => void | any;
}

export interface NeedsForAccess {
  bag?: string | string[] | null;
  conditions?: string | string[];
  affects?: string | string[];
  acceptMessage?: string;
  onAccept?: (game: Game) => void | any;
  denyMessage?: string;
  onDeny?: (game: Game) => void | any;
}
export interface NeedsForVisibility {
  bag: string | string[] | null;
  conditions?: string | string[];
  affects?: string | string[];
}

export interface Affect {
  stat: string;
  duration?: number;
  breakCondition: string;
  onAffect: (game: GameService) => void | any;
  onBreakCase: (game: GameService) => void | any;
}

export interface Chapter<Room, U> {
  itemCombinations: any[];
  cutScenes: CutScene[];
  dialogue: Dialogue[];
  conditions?: [] | null;
  startingPoint: string;
  rooms: Room;
}

export interface Item {
  id: number;
  name: string;
  combines: string;
  description: string;
  longDescriptions: any[];
  oneTimeUse: boolean;
  affects: Affect[]; // can come from on Use be instant or last forever
  uses?: number | null; // if one time use true
  onUse?: (
    game: GameService,
    item?: Item,
    conditionsToUse?: boolean
  ) => void | any;
  canOnlyBeUsedDuringState?: string | "Dialogue" | "Attack";
  combine: string;
  onCombine?: (newItem?: Item, game?: Game) => {};
}

export class Iterator {
  index: number = 0;
  end: number;
  onEnd: any;
  array: Array<any>;
  finish: boolean = false;
  constructor(array, onEnd) {
    this.index = 0;
    this.array = array;
    this.end = this.array.length - 1;
    this.onEnd = (game) => onEnd(game);
  }

  public endIteration(game: Game) {
    this.onEnd(game);

    this.finish = true;
  }

  public next(game: Game) {
    if (this.index === this.end) {
      console.log("end");
      return this.endIteration(game);
    } else {
      this.index += 1;
    }
  }
}
