import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'boards', loadChildren: () => import('./main-modules/boards-screen/boards-screen.module').then((m) => m.BoardsScreenModule) },
  { path: 'board', loadChildren: () => import('./main-modules/board/board.module').then((m) => m.BoardModule) },
  { path: '',   redirectTo: 'boards', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
