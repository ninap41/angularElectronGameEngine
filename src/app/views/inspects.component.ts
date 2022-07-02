import { Component, OnInit, Input } from "@angular/core";
import { Inspect } from "../games/the-haunting/types";
import { GameService } from "./game.service";

@Component({
  selector: "app-inspects",
  template: /* html */ `<div *ngIf="ifInspects()">
    <p>Inspects</p>
    <span *ngFor="let inspect of inspects"
      ><button *ngIf="this.gs.visible(inspect)" (click)="gs.inspect(inspect)">
        {{ inspect.name }}
      </button></span
    >
  </div>`,
})
export class InspectsComponent implements OnInit {
  @Input("inspects") inspects: Inspect[];
  constructor(public gs: GameService) {}

  ngOnInit(): void {}

  async inspect(inspect: Inspect) {
    await this.gs.visible(inspect);
  }

  ifInspects() {
    return this.inspects.length > 0;
  }
}
