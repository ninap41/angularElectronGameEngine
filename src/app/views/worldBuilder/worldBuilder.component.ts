import { Component, OnInit } from "@angular/core";
import {
  haunting,
  cutScenes,
  dialogue,
} from "../../games/the-haunting/the-haunting";
import { items, itemCombinations } from "../../games/the-haunting/items";
import { GameService } from "../game.service";
import { iterateObject } from "../../games/the-haunting/utils";
import { DialogueComponent } from "../events/dialogue.component";
import { Dialogue } from "src/app/games/the-haunting/types";
@Component({
  selector: "app-world-builder",
  template: /*html*/ `
    <button mat-button [matMenuTriggerFor]="menu">Items</button>
    <mat-menu #menu="matMenu">
      <span *ngFor="let item of gameStructure.items">
        <button mat-menu-item (click)="stringify(item)">{{ item.name }}</button>
      </span>
    </mat-menu>
    <button mat-button [matMenuTriggerFor]="itemCombinationsMenu">
      Item Combinations
    </button>
    <mat-menu #itemCombinationsMenu="matMenu">
      <span *ngFor="let item of gameStructure.itemCombinations">
        <button mat-menu-item (click)="stringify(item)">{{ item.name }}</button>
      </span>
    </mat-menu>

    <button mat-button [matMenuTriggerFor]="cutScenesMenu">
      Events ( cutScenes )
    </button>
    <mat-menu #cutScenesMenu="matMenu">
      <span *ngFor="let item of gameStructure.cutScenes">
        <button mat-menu-item (click)="stringify(item)">{{ item.name }}</button>
      </span>
    </mat-menu>

    <button mat-button [matMenuTriggerFor]="dialogueMenu">
      Events ( dialogue )
    </button>
    <mat-menu #dialogueMenu="matMenu">
      <span *ngFor="let item of gameStructure.dialogue">
        <button mat-menu-item (click)="stringify(item)">{{ item.name }}</button>
      </span>
    </mat-menu>

    <div class="d-flex" *ngIf="str">
      <div class="w-30 p-2">
        <pre>{{ str }}</pre>
      </div>
      <ngb-accordion
        #acc="ngbAccordion"
        class="width-70 p-2"
        activeIds="ngb-panel-0"
      >
        <ngb-panel title="view more properties">
          <ng-template ngbPanelContent> Play </ng-template>
        </ngb-panel>
      </ngb-accordion>
    </div>
    <app-dialogue [dialogue]="dialogue"></app-dialogue>
  `,
})
export class WorldBuilderComponent implements OnInit {
  gameStructure: any;
  str: any;
  output: any;
  dialogue: Dialogue;
  constructor(public gs: GameService) {
    this.gameStructure = {
      haunting,
      itemCombinations: iterateObject(itemCombinations),
      items: iterateObject(items),
      cutScenes: iterateObject(cutScenes),
      dialogue: iterateObject(dialogue),
    };

    this.dialogue = {
      music: null,
      name: "testDialogue",
      turns: [
        {
          character: "Chris",
          emotion: "normal",
          content:
            "Hey this is chris. I don't think much of myself to be honest.",
          position: "top",
          sound: undefined,
        },
        {
          character: " Pastor Heisenberg",
          emotion: "inquisitive",
          content: "Is it cause you're haunted by a demon?",
          position: "bottom",
          sound: undefined,
        },
        {
          character: "Chris",
          emotion: "angry",
          content: "Who are you?",
          position: "top",
          sound: undefined,
        },
        {
          character: "Pastor Heisenberg",
          emotion: "inquisitive",
          content: "Your worst nightmare bub.",
          position: "bottom",
          sound: undefined,
        },
        {
          character: "NONE",
          content: "what will you do?",
          position: "center",
          sound: undefined,
        },
      ],
      items: [undefined, undefined],
      prompts: () => undefined,
    };
    // console.log(this.gameStructure.cutScenes, "cutScenes");
    // console.log(this.gameStructure.itemCombinations, "combinations");
    // console.log(this.gameStructure.dialogue, "dialogue");
  }

  ngOnInit(): void {}

  stringify(str) {
    this.str = JSON.stringify(str, null, 4);
  }
}
