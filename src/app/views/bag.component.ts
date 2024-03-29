import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Item } from "../games/the-haunting/types";
import { GameService } from "./game.service";

@Component({
  selector: "app-bag",
  template: /*html*/ `
    <div *ngIf="items.length > 0" class="px-3 py-3">
      <p class="title">Inventory ({{ items.length }})</p>
      <div>
        <mat-grid-list cols="4" rowHeight="1:1">
          <div *ngFor="let item of items">
            <mat-grid-tile>
              <button mat-button id="itemSlot" [matMenuTriggerFor]="useItem">
                {{ item.name }}
              </button>
              <mat-menu #useItem="matMenu">
                <span mat-menu-item (click)="gs.useItem(item)">Use</span>
                <span mat-menu-item (click)="gs.lookAt(item)">Look At</span>
                <button
                  mat-menu-item
                  *ngIf="item.combine"
                  [matMenuTriggerFor]="combine"
                >
                  Combine
                </button>
              </mat-menu>
              <mat-menu #combine="matMenu">
                <span *ngFor="let dropdownItem of items">
                  <span
                    mat-menu-item
                    [disabled]="!gs.canCombine(item, dropdownItem)"
                    (click)="gs.combine(item, dropdownItem)"
                    >{{ dropdownItem.name }}
                    <span *ngIf="item.name === dropdownItem.name"
                      >(self)</span
                    ></span
                  >
                </span>
              </mat-menu>
            </mat-grid-tile>
          </div>
        </mat-grid-list>
      </div>
    </div>
  `,
})
export class BagComponent implements OnInit {
  @Input("items") items: Item[];
  constructor(public router: Router, public gs: GameService) {}
  ngOnInit() {}
}
