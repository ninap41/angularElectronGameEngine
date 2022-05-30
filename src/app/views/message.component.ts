import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "./game.service";

@Component({
  selector: "app-message",
  template: /*html*/ `
    <div>
      <ng-template #denyMessage> Deny Message </ng-template>
      <ng-template #acceptMessage>
        <div [innerHTML]="gs.game.user.acceptMessage">
          {{ gs.game.user.acceptMessage }}
        </div>
      </ng-template>
      <ng-template #createdMessage>
        <div [innerHTML]="gs.game.user.createdMessage">
          {{ gs.game.user.createMessage }}
        </div>
      </ng-template>
      <ng-template #viewItem>
        <pre class="text-light">{{ gs.viewItem | json }}</pre>
      </ng-template>
    </div>
  `,
})
export class MessageComponent implements AfterViewInit {
  constructor(public router: Router, public gs: GameService) {}
  @ViewChild("denyMessage") denyMessage: TemplateRef<any>;
  @ViewChild("acceptMessage") acceptMessage: TemplateRef<any>;
  @ViewChild("createdMessage") createdMessage: TemplateRef<any>;
  @ViewChild("viewItem") viewItem: TemplateRef<any>;

  ngAfterViewInit(): void {
    console.log(this.viewItem, "message comp");
    this.gs.templates = {
      denyMessage: this.denyMessage,
      acceptMessage: this.acceptMessage,
      createdMessage: this.createdMessage,
      viewItem: this.viewItem,
    };
  }
}
