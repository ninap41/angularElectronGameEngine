import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameComponent } from "./views/game.component";
import { WorldBuilderComponent } from "./views/worldBuilder/worldBuilder.component";

const routes: Routes = [
  { path: "", component: GameComponent },
  { path: "worldBuilder", component: WorldBuilderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
