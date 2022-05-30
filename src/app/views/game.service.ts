import { Injectable } from "@angular/core";
import { games } from "../games";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MessageComponent } from "./message.component";
import { Game, State, User } from "../games/the-haunting/types";
import { bold } from "../games/the-haunting/utils";

@Injectable({
  providedIn: "root",
})
export class GameService {
  templates; // Modals
  viewItem; // viewItem / character/ etc
  gameTitle;
  game: Game;
  config = new MatSnackBarConfig();
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  newGame(title: string): void {
    this.game = {
      world: games[title], // holds the game data
      title, //game title
      state: State.room, // event type  'Dialogue' | 'CutScene' | 'Attack' | 'Puzzle' | 'Room'
      chapter: "chapter1",
      genericMessage: null,
      denyMessage: null,
      acceptMessage: null,
      createdMessage: null,
      user: {
        event: null,
        ...games[title].user, //new character
        worldPoint:
          games[title].world["chapter1"].rooms[
            games[title].world["chapter1"].startingPoint
          ], // starting point
        history: [],
      },
    };
  }

  isGame(): boolean {
    return this.game ? true : false;
  }

  getChapter() {
    return this.game.chapter;
  }

  open(ref) {
    this.dialog.open(ref);
  }

  inspect(inspect) {
    let accesibleMessageKey = this.accessible(inspect)
      ? "acceptMessage"
      : "denyMessage";
    this.game[accesibleMessageKey] = "";
    this.game[accesibleMessageKey] +=
      inspect.needsForAccess[accesibleMessageKey];
    this.game = inspect.onAction(this.game, inspect, this.accessible(inspect));
    this.dialog.open(this.templates[accesibleMessageKey]);
  }

  direction(direction: { name: string; needForEntry: any; hiddenUnless: any }) {
    if (this.accessible(direction)) {
      //@ts-ignore
      this.game.history.push(this.game.user.worldPoint);
      this.game.user.worldPoint =
        this.game.world[this.getChapter()][direction.name];
    }
  }

  /*======== BAG =========*/

  useItem(item: any) {
    this.viewItem = item;
  }

  canCombine(item, target): Boolean {
    if (item.combine)
      return item.combine === target.name && item.id !== target.id
        ? true
        : false;
    return false;
  }

  lookAt(item: any) {
    this.viewItem = item;
    this.dialog.open(this.templates.viewItem);
  }

  combine(sourceItem, targetItem) {
    if (sourceItem.combine) {
      var newItem;
      this.game.world.itemCombinations.forEach((combination) => {
        if (
          combination.materials.includes(sourceItem.name) &&
          combination.materials.includes(targetItem.name)
        )
          newItem = combination.item;
      });
      this.game.user.bag.push(newItem);
      this.game.createdMessage = `You created ${bold(newItem.name)}!`;
      this.game = sourceItem.onCombine(newItem, this.game);
      this.dialog.open(this.templates.createdMessage);
      this.game.user.bag = this.game.user.bag.filter(
        (item) => item.id !== sourceItem.id && item.id !== targetItem.id
      );
    }
  }

  /*======== ACCESS/DYNAMIC =========*/

  visible(action): Boolean {
    /*  checks if .needsForVisibility exists. If it does, then takes the first key of the needsVisibility object (which matches against a user's bag[], affects[], importantMarkers[]  and searches for a match (by item.name) within the array. If a match is found show the inspect) */
    return action.needsForVisibility
      ? this.game.user[Object.keys(action.needsForVisibility)[0]].some(
          (item: any) =>
            action.needsForVisibility[
              Object.keys(action.needsForVisibility)[0]
            ] === item.name
        )
        ? true
        : false
      : true;
  }

  areVisiblesPresent(list) {
    return list.filter((item) => this.visible(item)).length === 0
      ? false
      : true;
  }

  accessible(action) {
    // direction / inspect .needsForAccessibility
    return action.needsForAccess
      ? this.game.user[Object.keys(action.needsForAccess)[0]].some(
          (item: any) =>
            action.needsForAccess[Object.keys(action.needsForAccess)[0]] ===
            item.name
        )
        ? true
        : false
      : true;
  }
}
