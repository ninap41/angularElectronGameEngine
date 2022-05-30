import { Component, Input, OnInit } from "@angular/core";
import { Dialogue, Iterator } from "../../games/the-haunting/types";
import { GameService } from "../game.service";

@Component({
  selector: "app-dialogue",
  template: /*html*/ `
    <div
      *ngIf="dialogue && !this.iterator.finish; else noDialogue"
      class=" d-flex justify-content-around"
    >
      <div
        style="min-width: 300px"
        class="py-2 w-40 d-flex justify-content-center align-items-center"
      >
        {{ dialogue.turns[this.iterator.index].character }}<br />

        mood: {{ dialogue.turns[this.iterator.index].emotion }}
      </div>
      <div
        class="py-2 w-100 d-flex flex-column justify-content-center align-items-center"
      >
        <div class="py-2">
          "{{ dialogue.turns[this.iterator.index].content }}"
        </div>
        <button class="btn py-2" (click)="this.iterator.next(this.gs.game)">
          Continue
        </button>
      </div>
    </div>
    <ng-template #noDialogue>
      <div class="py-2 w-40 d-flex justify-content-center align-items-center">
        No Dialogue present
      </div>
    </ng-template>
  `,
})
export class DialogueComponent implements OnInit {
  @Input("dialogue") dialogue: Dialogue;
  iterator;

  constructor(public gs: GameService) {}

  ngOnInit(): void {
    this.dialogue = this.dialogue;
    this.iterator = new Iterator(this.dialogue.turns, () =>
      this.dialogue.onEnd(this.gs.game)
    );
  }
  next() {
    this.iterator.next(this.gs.game);
  }
}
