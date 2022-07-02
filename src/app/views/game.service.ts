import { Injectable, TemplateRef } from "@angular/core";
import { games } from "../games";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MessageComponent } from "./message.component";
import {
  Direction,
  Game,
  Inspect,
  Item,
  State,
  User,
} from "../games/the-haunting/types";
import { bold, iterateObject } from "../games/the-haunting/utils";
import { ConfirmDialogModel, DialogComponent } from "./dialog.component";
import { itemCombinations } from "../games/the-haunting/items";

@Injectable({
  providedIn: "root",
})
export class GameService {
  templates; // Modals
  gameMode: "dev" | "prod" = "dev";
  viewItem; // viewItem / character/ etc
  gameTitle;
  game: Game;
  config = new MatSnackBarConfig();
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  newGame(title: string): void {
    this.game = {
      world: games[title].game.world, // holds the game data
      title, //game title
      state: State.room, // event type  'Dialogue' | 'CutScene' | 'Attack' | 'Puzzle' | 'Room'
      chapter: "chapter1",
      genericMessage: null,
      denyMessage: null,
      acceptMessage: null,
      createdMessage: null,
      event: null,
      importantMarker: [], // storyPoints that can influence events or inspects
      user: {
        ...games[title].user, //new character
        worldPoint:
          games[title].game.world["chapter1"].rooms[
            games[title].game.world["chapter1"].startingPoint
          ], // starting point
        history: [],
      },
    };
  }
  saveGame() {
    localStorage.setItem("game", JSON.stringify(this.game));
    alert("game saved");
  }

  loadGame() {
    localStorage.setItem("game", JSON.stringify(this.game));
    alert("game saved");
  }

  eraseGame() {
    localStorage.setItem("game", null);
    alert("game erased");
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

  async inspect(inspect: Inspect) {
    let accesibleMessageKey = this.accessible(inspect)
      ? "acceptMessage"
      : "denyMessage"; // whether accept or deny

    this.game[accesibleMessageKey] =
      inspect.needsForAccess[accesibleMessageKey];
    await this.dialog
      .open(this.templates[accesibleMessageKey])
      .afterClosed()
      .toPromise()
      .then(async () => {
        if (inspect.instantItem) {
          await this.addItem(inspect.instantItem);
        }
        await inspect.onAction(this, inspect);
      });

    await this.removeInspect(inspect);
  }

  async removeInspect(item: Inspect) {
    this.userWorldPoint().inspects = this.userWorldPoint().inspects.filter(
      (i: Inspect) => i.name !== item.name
    );
    this.gameWorldPoint().rooms[this.userWorldPoint().name].inspects =
      this.gameWorldPoint().rooms[this.userWorldPoint().name].inspects.filter(
        (i: Inspect) => i.name !== item.name
      );
  }
  async traverse(direction: Direction) {
    if (this.accessible(direction)) {
      await this.displayTraverseMessage(direction, "acceptMessage").then(
        async () => {
          const type = await this.accessibleType(direction);
          if (type && type === "bag") {
            const itemName = String(direction.needsForAccess[type]);
            const item = this.findUniqueItemByName(itemName);
            await item.onUse(this, item, true);
            await this.removeRoomNeedsForAccess(direction.name);
          }
        }
      );
      this.game.user.worldPoint = this.gameWorldPoint().rooms[direction.name];
    } else {
      await this.displayTraverseMessage(direction, "denyMessage");
    }
  }

  async removeRoomNeedsForAccess(targetDirection) {
    // example kitch
    console.log(
      "MOTHERFUCKER",
      this.gameWorldPoint().rooms[this.userWorldPoint().name].directions.map(
        (dir) =>
          dir.name === targetDirection ? { ...dir, needsForAccess: null } : dir
      )
    );
    this.gameWorldPoint().rooms[this.userWorldPoint().name].directions.map(
      (dir) => {
        if (dir.name === targetDirection) {
          dir.needsForAccess = null;
        }
      }
    );
  }

  addImportantMarker(marker: any) {
    if (!this.game.importantMarker.some(marker))
      this.game.importantMarker.push(marker);
  }

  addToWorldHistory() {
    this.game.user.worldHistory.push(this.game.user.worldPoint);
  }
  addToEventHistory(direction: Direction) {
    if (direction.eventHistory) {
      this.game.user.eventHistory.push(direction.eventHistory);
    }
  }

  /*======== BAG =========*/

  async useItem(item: any) {
    if (item.onUse) {
      await item.onUse(this, item, item.useConditions(item));
    }
  }

  findUniqueItemByName(itemName: string) {
    console.log(
      this.game.user.bag.find((it: Item) => it.name === itemName),
      "wtf"
    );
    return this.game.user.bag.find((it: Item) => it.name === itemName);
  }
  canCombine(item: Item, target: Item): Boolean {
    if (item.combine)
      return item.combine === target.name && item.id !== target.id
        ? true
        : false;
    return false;
  }

  async lookAt(item: any) {
    this.viewItem = item;
    await this.dialog.open(this.templates.viewItem);
  }

  removeItem(item: Item) {
    this.game.user.bag = this.game.user.bag.filter(
      (it: Item) => it.id !== item.id
    );
  }
  async combine(sourceItem, targetItem) {
    console.log(`${sourceItem} combine with ${targetItem}`);
    if (sourceItem.combine) {
      var newItem;
      this.gameWorldPoint().itemCombinations.forEach((combination) => {
        if (
          combination.materials.includes(sourceItem.name) &&
          combination.materials.includes(targetItem.name)
        )
          newItem = combination.item;
      });
      await this.addItem(newItem);
      await sourceItem.onCombine(newItem, this.game);
      this.removeItem(sourceItem);
      this.removeItem(targetItem); //(program)
    }
  }

  // MEssages
  async displayCreatedMessage(item: Item) {
    this.game.createdMessage = `You created ${bold(item.name)}!`;
    this.dialog
      .open(this.templates.createdMessage)
      .afterClosed()
      .toPromise()
      .then(() => {
        return;
      });
  }

  async displayNewItemMessage(item: Item) {
    this.game.createdMessage = `<ng-template><p>You obtained ${bold(
      item.name
    )}!</p></ng-template>`;

    await this.dialog
      .open(this.templates.createdMessage)
      .afterClosed()
      .toPromise()
      .then(() => {
        return;
      });
  }
  async displayQuickMessage(message: string) {
    this.game.createdMessage = `<p>${message}!</p>`;
    console.log("are we defined");
    await this.dialog
      .open(this.templates.createdMessage)
      .afterClosed()
      .toPromise()
      .then(() => {
        return;
      });
  }

  async displayTraverseMessage(
    direction: Direction,
    type: "denyMessage" | "acceptMessage"
  ) {
    if (direction.needsForAccess) {
      this.game.denyMessage = `${direction.needsForAccess[type]}`;
      await this.dialog
        .open(this.templates.denyMessage)
        .afterClosed()
        .toPromise()
        .then(() => {
          return;
        });
    }
  }

  displayRandomDialogue() {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.game.genericMessage = dialogResult;
    });
  }

  inBag(item: Item) {
    return this.game.user.bag.some((i: Item) => i.id === item.id);
  }
  async addItem(item: Item) {
    if (!this.inBag(item)) {
      console.log("item added");

      this.game.user.bag.push(item);
      await this.displayNewItemMessage(item);
      await this.lookAt(item);
    } else {
      await this.displayNewItemMessage(item);
    }
    //check for QTY and add to existing QTY
  }

  userWorldPoint() {
    return this.game.user.worldPoint;
  }

  gameWorldPoint() {
    return this.game.world[this.getChapter()];
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
  async accessibleType(action: Direction | Inspect) {
    return action.needsForAccess ? Object.keys(action.needsForAccess)[0] : null;
  }

  accessible(action: Direction | Inspect) {
    // direction / inspect .needsForAccessibility
    console.log(action.needsForAccess, "needs for access");
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
