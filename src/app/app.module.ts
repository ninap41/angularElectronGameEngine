import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularDraggableModule } from "angular2-draggable";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { GameService } from "./views/game.service";
import { GameComponent } from "./views/game.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { StartComponent } from "./views/start.component";
import { MessageComponent } from "./views/message.component";
import { BagComponent } from "./views/bag.component";
import { WorldBuilderComponent } from "./views/worldBuilder/worldBuilder.component";
import { WorldComponent } from "./views/world.component";
import { EventWrapperComponent } from "./views/events/eventWrapper.component";
import { SpacerPipe } from "./games/the-haunting/spacer.pipe";
import { DialogueComponent } from "./views/events/dialogue.component";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    StartComponent,
    MessageComponent,
    BagComponent,
    WorldComponent,
    WorldBuilderComponent,
    EventWrapperComponent,
    DialogueComponent,
    SpacerPipe,
  ],

  imports: [
    BrowserModule,
    CommonModule,
    NgbPaginationModule,
    NgbAlertModule,
    FontAwesomeModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    BrowserAnimationsModule,

    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    DragDropModule,
    MatGridListModule,

    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NgbModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    GameService,
    FormBuilder,
    HttpClient,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
