import { Component, Input, OnInit } from "@angular/core";
import { Dialogue } from "../../games/the-haunting/types";
import { GameService } from "../game.service";

@Component({
  selector: "app-dialogue",
  template: /*html*/ `
    <div ng-if="dialogue; else noDialogue" class="d-flex">
      <div class="d-flex"><{{ dialogue.name }}</div>

      <div class="character1">
        {{ dialogue.name }}
      </div>
    </div>
    <ng-template #noDialogue>
      something happened ... there is no dialogue event</ng-template
    >
  `,
})
export class DialogueComponent implements OnInit {
  @Input("dialogue") dialogue: Dialogue;

  constructor(public gs: GameService) {}

  ngOnInit(): void {
    this.dialogue = this.dialogue;
    console.log(this.dialogue);
  }
}
