import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardScreenComponent } from './main-modules/boards-screen/board-screen/board-screen.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main-modules/boards-screen/boards-screen.module').then((m) => m.BoardsScreenModule) }
  //{ path: '', component: BoardScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
