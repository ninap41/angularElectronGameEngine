import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { State } from "../games/the-haunting/types";
import { GameService } from "./game.service";

@Component({
  selector: "app-game",
  template: /*html*/ `
    <div class="px-3 py-3">
      <app-start> </app-start>
      <div *ngIf="gs.isGame()">
        <app-event-wrapper
          *ngIf="returnGameState(gs.game.state)"
        ></app-event-wrapper>
        <app-world *ngIf="'Room'"></app-world>
      </div>
      <app-bag [items]="gs.game.user.bag"></app-bag>
      <app-message></app-message>
    </div>
  `,
})
export class GameComponent implements OnInit {
  constructor(public router: Router, public gs: GameService) {}

  ngOnInit(): void {}
  returnGameState(state: string) {
    if (
      state ===
      (State.dialogue ||
        State.cutScene ||
        State.attack ||
        State.puzzle ||
        State.suddenEvent ||
        State.gameOver)
    ) {
      return true;
    }
  }
}
