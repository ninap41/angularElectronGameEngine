import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
import { CutScene, Frames } from "../games/the-haunting/types";
import { GameService } from "./game.service";

@Component({
  selector: "app-cut-scene",
  template: /*html*/ `
    <!-- https://www.playfuljs.com/a-first-person-engine-in-265-lines/ -->
    <div
      *ngIf="!gs.isGame()"
      class="jumbotron d-flex justify-content-center align-items-center world"
    >
      cutscene
    </div>
  `,
})
export class CutSceneComponent implements OnInit {
  @Input("scene") scene: CutScene;
  frames;
  constructor(public router: Router, public gs: GameService) {}

  ngOnInit(): void {
    this.frames = this.scene;
  }
}
