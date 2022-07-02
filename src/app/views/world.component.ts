import { Component, OnInit, ViewChild } from "@angular/core";
import { GameService } from "./game.service";

@Component({
  selector: "app-world",
  template: /*html*/ `<div *ngIf="gs.game.user.worldPoint">
    <h2 class="title">
      {{ gs.game.title }} | {{ gs.game.chapter | spacer: 7 | uppercase }} :
      {{ gs.game.user.worldPoint.name }}
    </h2>
    <span *ngIf="gs.game.user.worldPoint.img; else placeholderRoom">
      No Image
      <!-- 
      <img class="roomImg" [src]="gs.game.user.worldPoint.img" /> -->
    </span>
    <ng-template #placeholderRoom>
      <!-- <img class="roomImg" src="assets/the-perfect-murder/door.jpeg" /> -->
    </ng-template>

    <div
      class="worldDescription"
      [innerHTML]="gs.game.user.worldPoint.description | replacer"
    ></div>

    <app-directions
      [directions]="gs.game.user.worldPoint.directions"
    ></app-directions>

    <app-inspects [inspects]="gs.game.user.worldPoint.inspects"></app-inspects>
  </div> `,
})
export class WorldComponent implements OnInit {
  constructor(public gs: GameService) {}
  ngOnInit(): void {}
}
