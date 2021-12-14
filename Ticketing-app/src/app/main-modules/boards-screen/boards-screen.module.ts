import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardScreenComponent } from './board-screen/board-screen.component';
import { BoardScreenRoutingModule } from './board-screen-routing.module';
import { BoardPreviewComponent } from './board-screen/board/board-preview.component';
import { UiButtonModule } from 'src/app/ui-components/ui-button/ui-button.module';
import { UiDeleteButtonModule } from 'src/app/ui-components/ui-delete-button/ui-delete-button.module';
import { ModalModule } from 'src/app/ui-components/modal/modal.module';
import { UiInputModule } from 'src/app/ui-components/ui-input/ui-input.module';
import { UiDialogModule } from 'src/app/ui-components/ui-dialog/ui-dialog.module';



@NgModule({
  declarations: [
    BoardScreenComponent,
    BoardPreviewComponent
  ],
  imports: [
    CommonModule,
    BoardScreenRoutingModule,
    UiButtonModule,
    UiDeleteButtonModule,
    ModalModule,
    UiInputModule,
    UiDialogModule
  ]
})
export class BoardsScreenModule { }
   