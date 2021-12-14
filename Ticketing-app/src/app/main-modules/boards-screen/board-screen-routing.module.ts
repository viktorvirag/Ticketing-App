import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardScreenComponent } from "./board-screen/board-screen.component";

const routes: Routes = [
    { path: '', component: BoardScreenComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BoardScreenRoutingModule { }