import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "./game.service";

@Component({
  selector: "app-start",
  template: /*html*/ ` <div class="avatarAndStats border" cdkDrag>
    <img class="avatar" [src]="gs.game.user.img" /><br />

    <div class="overviewStats">
      <div>
        STATS<br />
        <b>health</b>: {{ gs.game.user.health }}<br />
        <b>fear</b>: {{ gs.game.user.fear }}<br />
        <br />
        AFFECTS<br />
        <b>no affects</b>
      </div>
    </div>
  </div>`,
})
export class StartComponent implements OnInit {
  constructor(public router: Router, public gs: GameService) {}

  ngOnInit(): void {}
}
