import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "./game.service";

@Component({
  selector: "app-start",
  template: /*html*/ `
    <div
      *ngIf="!gs.isGame()"
      class="d-flex justify-content-center flex-column align-items-center world"
    >
      <h1 class="m-fadeIn">The Haunting</h1>
      <button class="btn btn-primary my-4" (click)="start('The Haunting')">
        Start Game
      </button>
    </div>
  `,
  styles: [
    /* css */ `
      .m-fadeIn {
        animation-name: example;
        animation-duration: 2s;
      }

      @keyframes example {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class StartComponent implements OnInit {
  constructor(public router: Router, public gs: GameService) {
    // this.start("The Haunting");
  }

  ngOnInit(): void {}
  start(game: any): void {
    this.gs.newGame(game);
  }
}
