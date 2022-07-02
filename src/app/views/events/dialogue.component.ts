import {
  ViewContainerRef,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
} from "@angular/core";

// https://www.npmjs.com/package/angular-typing-animation
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
        <div
          class="d-flex flex-column"
          *ngIf="!dialogue.turns[this.iterator.index].prompt; else prompt"
        >
          <!--<ng-container *ngIf="!start; else content"></ng-container>-->
          <div class="py-2">
            <!-- <ng-template #content> 
              <span
                typingAnimation
                [typeSpeed]="50"
                [condition]="start"
                [startDelay]="1000"
                (complete)="onTypingAnimationComplete()"
                [hideCursorOnComplete]="true"
                >
                </span
              >
                          </ng-template>

                -->
            <span>{{ dialogue.turns[this.iterator.index].content }}</span>
          </div>
          <button class="btn py-2" (click)="this.iterator.next(this.gs.game)">
            Continue
          </button>
        </div>

        <ng-template #prompt>
          <div
            class="d-flex flex-column"
            *ngFor="
              let choice of dialogue.turns[this.iterator.index].prompt.choices
            "
          >
            <div class="py-2">
              {{ dialogue.turns[this.iterator.index].prompt.content }}<br />
            </div>
            <button
              (click)="choice.onAction(gs); this.iterator.next(this.gs.game)"
              class="btn py-2"
            >
              {{ choice.content }}
            </button>
          </div>
        </ng-template>
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
  // @ViewChild("content") typingRef: TemplateRef<any>;
  // start: boolean = false;

  iterator;

  constructor(public gs: GameService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dialogue = this.dialogue;
    this.iterator = new Iterator(this.dialogue.turns, () =>
      this.dialogue.onEnd(this.gs)
    );

    // setTimeout(() => (this.start = true), 500);
  }
  // next() {
  //   this.iterator.next(this.gs.game);
  //   this.cdr.detectChanges();
  //   // this.start = true;
  // }
  // onTypingAnimationComplete() {
  //   console.log("complete");
  //   this.start = false;
  // }
}
