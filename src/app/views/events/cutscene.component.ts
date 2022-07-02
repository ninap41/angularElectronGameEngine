import { Component, Input, OnInit } from "@angular/core";
import { CutScene, Iterator } from "src/app/games/the-haunting/types";
import { GameService } from "../game.service";

@Component({
  selector: "app-cut-scene",
  template: /* html */ `<div style="display: flex; flexalign-items: center;">
    <div mat-dialog-content>
      <img
        class="rounded flex justify-self-center"
        [src]="scene.frames[iterator.index].src"
      />
    </div>

    <div *ngIf="scene.frames[iterator.index].mode === 'continue'">
      <button
        mat-raised-button
        color="primary"
        (click)="iterator.next(gs.game)"
      >
        Continue
      </button>
    </div>
  </div> `,
})
export class CutsceneComponent implements OnInit {
  @Input("cutscene") cutcene: CutScene;
  scene;
  iterator;
  constructor(public gs: GameService) {}

  ngOnInit(): void {
    this.scene = this.cutcene;
    this.iterator = new Iterator(this.scene.frames, () =>
      this.scene.onEnd(this.gs)
    );
  }
}
