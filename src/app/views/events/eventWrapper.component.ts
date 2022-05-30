import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { GameService } from "../game.service";
enum Events {
  dialogue = "dialogue",
  shop = "shop",
  encounter = "encounter",
  cutScene = "cutScene",
}

@Component({
  selector: "app-event-wrapper",
  template: /*html*/ ` <div><app-dialogue></app-dialogue></div> `,
})
export class EventWrapperComponent implements OnInit {
  constructor(public gs: GameService) {}
  @Input("event") eventType: Events;
  ngOnInit(): void {
    // Event[this.eventType]()
  }
}
