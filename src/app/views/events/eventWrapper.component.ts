import { Component, OnInit, Input } from "@angular/core";
import {
  CutScene,
  Attack,
  Dialogue,
  Puzzle,
  State,
  GameOver,
  SuddenEvent,
} from "src/app/games/the-haunting/types";
import { GameService } from "../game.service";

@Component({
  selector: "app-event-wrapper",
  template: /*html*/ `
    <div [ngSwitch]="event.type">
      <div *ngSwitchCase="state.dialogue">
        <app-dialogue [dialogue]="event"></app-dialogue>
      </div>
      <div *ngSwitchCase="state.puzzle" [puzzle]="event">Puzzle</div>
      <div *ngSwitchCase="state.attack" [attack]="event">Attack</div>
      <div *ngSwitchCase="state.cutScene" [cutScene]="event">>CutScene</div>
      <div *ngSwitchCase="state.suddenEvent">
        <app-sudden-event [suddenEvent]="event"></app-sudden-event>

        <div *ngSwitchDefault>not a dialogue or one of the above</div>
      </div>
    </div>
  `,
})
export class EventWrapperComponent implements OnInit {
  constructor(public gs: GameService) {}
  @Input("event") event:
    | Dialogue
    | Attack
    | Puzzle
    | CutScene
    | GameOver
    | SuddenEvent;
  state = State;
  ngOnInit(): void {
    console.log("eventwrapper component");
  }
}
