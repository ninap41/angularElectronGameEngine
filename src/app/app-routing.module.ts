import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameComponent } from "./views/game.component";
import { WorldBuilderComponent } from "./views/worldBuilder/worldBuilder.component";

const routes: Routes = [
  { path: "", component: GameComponent, pathMatch: "full" },
  { path: "home", component: GameComponent },

  { path: "worldBuilder", component: WorldBuilderComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
