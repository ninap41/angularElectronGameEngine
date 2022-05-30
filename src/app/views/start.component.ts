import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "./game.service";
@Component({
  selector: "app-start",
  template: /*html*/ `
    <div
      *ngIf="!gs.isGame()"
      class="d-flex justify-content-center align-items-center world"
    >
      <h1>The Haunting</h1>
      <button class="btn btn-primary" (click)="start('The Haunting')">
        Start Game
      </button>
    </div>
  `,
})
export class StartComponent implements OnInit {
  constructor(public router: Router, public gs: GameService) {}

  ngOnInit(): void {}
  start(game: any): void {
    this.gs.newGame(game);
  }
}
