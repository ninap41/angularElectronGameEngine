import { Component, OnInit, ViewChild } from "@angular/core";
import { GameService } from "./game.service";

@Component({
  selector: "app-world",
  template: /*html*/ ` <h2 class="title">
      {{ gs.game.title }} | {{ gs.game.user.chapter | spacer: 7 }} :
      {{ gs.game.user.worldPoint.name }}
    </h2>
    <span *ngIf="gs.game.user.worldPoint.img; else placeholderRoom">
      <img class="roomImg" [src]="gs.game.user.worldPoint.img" />
    </span>
    <ng-template #placeholderRoom>
      <img class="roomImg" src="assets/the-perfect-murder/door.jpeg" />
    </ng-template>

    <div class="worldDescription">
      <p>{{ gs.game.user.worldPoint.description }}</p>
    </div>`,
})
export class WorldComponent implements OnInit {
  constructor(public gs: GameService) {}
  ngOnInit(): void {}
}
