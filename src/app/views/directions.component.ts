import { Component, Input, OnInit } from "@angular/core";
import { Direction } from "../games/the-haunting/types";
import { DialogComponent } from "./dialog.component";
import { GameService } from "./game.service";

@Component({
  selector: "app-directions",
  template: /*html*/ `<div *ngIf="ifDirections()">
    <p>Directions</p>
    <span *ngFor="let direction of directions"
      ><button *ngIf="this.gs.visible(direction)" (click)="traverse(direction)">
        {{ direction.name }}
      </button></span
    >
  </div>`,
})
// <button (click)="gs.displayRandomDialogue()">confirm</button>
export class DirectionsComponent implements OnInit {
  @Input("directions") directions: Direction[];
  constructor(public gs: GameService) {}

  ngOnInit(): void {}

  async traverse(direction: Direction) {
    await this.gs.traverse(direction);
  }

  ifDirections() {
    return this.directions.length > 0;
  }
}
