export interface Events {
  cutScenes: Map<string, CutScene>;
  dialogue?: Map<any, Dialogue>;
  attack?: Map<any, Attack>;
}

export enum State {
  dialogue = "Dialogue",
  cutsScene = "CutScene",
  attack = "Attack",
  room = "Room",
  puzzle = "Puzzle",
}

export interface Enemy {}
export interface Attack {
  enemy: Enemy;
  emotion: "base";
  health: number;
  attackPower: number;
}

export interface Puzzle {}

export interface CutScene {
  music?: string | null;
  name: string;
  frames?: Frames[] | null;
}
export interface Frames {
  src?: string;
  continue: boolean;
  text?: null;
  sound?: null;
  prompt?: (choices: Choices[]) => {};
}

export interface Dialogue {
  name?: string | null;
  music?: string | null;
  turns?: Turns[];
  items?: Item[] | null;
  prompts?: () => {};
}
export interface Turns {
  character?: string | null;
  emotion?: string | null;
  content?: string | null;
  sound?: null;
  position?: string | null;
  prompts?: (choices: Choices[]) => {};
}

export interface Choices {
  name: string;
  description: string;
  onAction?: (game: Game) => {};
}

export interface Game {
  world: Chapter<any, any>;
  title: string;
  state: State;
  chapter: string;
  genericMessage?: string | null;
  denyMessage?: string | null;
  acceptMessage?: string | null;
  createdMessage?: string | null;
  user: User;
}

export interface User {
  affects: Affect[];
  bag?: Item[] | null;
  event?: Dialogue | CutScene | Attack | Puzzle;
  importantMarker?: any[] | null;
  worldPoint: WorldPoint<any, any>;

  health: number;
  fear: number;
  faith: number;
}

export interface Room {
  name: string;
  img?: string;
  description: string;
  directions?: Directions[] | null;
  inspects?: Inspects[] | null;
  onEnter?: () => {};
  onLeave?: () => {};
}

export interface WorldPoint<T, U> extends Room {
  endGame?: boolean;
  nextChapter?: boolean;
}

export interface Directions {
  name: string;
  description?: string | null;
  needsForAccess?: NeedsForAccess | null;
  needsForVisibility?: NeedsForVisibility | null;
  onAction?: () => {};
}

export interface Inspects {
  name: string;
  description: string;
  needsForAccess?: NeedsForAccess;
  instantItem: Item;
  needsForVisibility: NeedsForVisibility;
  onAction?: () => {};
}

export interface NeedsForAccess {
  bag: string | string[] | null;
  conditions?: string | string[];
  acceptMessage?: string;
  onAccept?: () => {};
  denyMessage?: string;
  onDeny?: () => {};
}
export interface NeedsForVisibility {
  bag: string | string[] | null;
  conditions?: string | string[];
}

export interface Item {
  id: number;
  name: string;
  combines: string;
  description: string;
  oneTimeUse: boolean;
  affects: Affect[]; // can come from on Use be instant or last forever
  uses?: number | null; // if one time use true
  onUse: (game: Game) => {};
}

export interface Affect {
  stat: string;
  duration?: number;
  breakCondition: string;
  onAffect: () => {};
  onBreakCase: () => {};
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
  canOnlyBeUsedDuringState: string | "Dialogue" | "Attack";
  combine: boolean;
  onCombine?: (newItem?: Item, game?: Game) => {};
  description: string;
  oneTimeUse: boolean;
}
