import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "./game.service";

@Component({
  selector: "app-game",
  template: /*html*/ `
    <div class="px-3 py-3">
      <app-start> </app-start>
      <div *ngIf="gs.isGame() && gs.game.user.state === 'default'">
        <app-world></app-world>
        <app-bag></app-bag>
      </div>
    </div>
    <app-message></app-message>
  `,
})
export class GameComponent implements AfterViewInit {
  constructor(public router: Router, public gs: GameService) {}

  ngAfterViewInit(): void {}
}
