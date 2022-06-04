import { Component, Input, OnInit } from "@angular/core";
import { Iterator, SuddenEvent } from "src/app/games/the-haunting/types";
import { GameService } from "../game.service";

@Component({
  selector: "app-sudden-event",
  template: /* html */ `
    <div *ngIf="intro; else noIntro" class="d-flex flex-column">
      <span> {{ suddenEvent.intro[this.iterator.index] }}</span>
      <button (click)="this.iterator.next(this.gs.game)" class="btn py-2">
        next
      </button>
    </div>
    <ng-template #noIntro>
      <div class="d-flex justify-content-center flex-column">
        <div>{{ this.timeLeft }} seconds left!</div>
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped bg-danger"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
            [ngStyle]="returnStyle()"
          ></div>
        </div>
      </div>
    </ng-template>
  `,
})
export class SuddenEventComponent implements OnInit {
  @Input("suddenEvent") suddenEvent: SuddenEvent;
  timeLeft: number = 60;
  interval;
  intro;
  iterator: Iterator;
  convertedTime = `100%`;
  constructor(public gs: GameService) {}

  ngOnInit(): void {
    console.log(this.suddenEvent);

    if (this.suddenEvent.intro) {
      this.iterator = new Iterator(
        this.suddenEvent.intro,
        (gs: GameService) => {
          this.intro = null;
          this.iterator = null;
          this.isTimed();
        }
      );
      this.intro = this.suddenEvent.intro ?? null;
      console.log(this.iterator);
    } else {
      this.isTimed();
    }
  }

  isTimed() {
    if (this.suddenEvent.timed) {
      this.timeLeft = this.suddenEvent.time;
      this.styleExp();
      this.startTimer();
    }
  }
  styleExp() {
    var conversion = 100 / this.suddenEvent.time;
    var total = this.timeLeft * conversion;
    this.convertedTime = `${total}%`;
  }
  returnStyle() {
    return { width: this.convertedTime };
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.styleExp();
      } else {
        this.suddenEvent.onTimeOut(this.gs);
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
