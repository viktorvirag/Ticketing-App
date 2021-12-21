import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './board/column/column.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UiButtonModule } from 'src/app/ui-components/ui-button/ui-button.module';
import { TicketComponent } from './board/column/ticket/ticket.component';
import { UiInputModule } from 'src/app/ui-components/ui-input/ui-input.module';
import { UiMoreModule } from 'src/app/ui-components/ui-more/ui-more.module';
import { UiDialogModule } from 'src/app/ui-components/ui-dialog/ui-dialog.module';
import { ModalModule } from 'src/app/ui-components/modal/modal.module';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    DragDropModule,
    UiButtonModule,
    UiInputModule,
    UiMoreModule,
    ModalModule,
    UiDialogModule
  ]
})
export class BoardModule { }
