import { Component, TemplateRef, ViewEncapsulation } from "@angular/core";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { GameService } from "./views/game.service";
import { MessageComponent } from "./views/message.component";

@Component({
  selector: "app-root",
  template: /*html*/ ` <div class="main-wrapper">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <fa-icon [icon]="faGamepad" class="fa-lg"></fa-icon>
      </a>
      <a
        class="text-light bg-dark"
        routerLinkActive="active"
        [routerLink]="['/']"
        >home</a
      >

      <a
        class="text-light bg-dark"
        routerLinkActive="active"
        [routerLink]="['worldBuilder']"
        >game builder</a
      >
    </nav>
    <router-outlet class="container"></router-outlet>
  </div>`,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  faGamepad = faGamepad;
  title = "website";

  constructor(public gs: GameService) {}
}
