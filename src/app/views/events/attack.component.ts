import { Component, Input, OnInit } from "@angular/core";
import { Attack } from "src/app/games/the-haunting/types";

@Component({
  selector: "app-attack",
  template: /* html */ ` <div>attack component</div> `,
})
export class AttackComponent implements OnInit {
  @Input("attack") attack: Attack;

  constructor() {}

  ngOnInit(): void {
    console.log(this.attack);
  }
}
