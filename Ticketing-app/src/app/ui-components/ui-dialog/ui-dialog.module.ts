import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDialogComponent } from './ui-dialog.component';
import { UiButtonModule } from '../ui-button/ui-button.module';
import { UiDeleteButtonModule } from '../ui-delete-button/ui-delete-button.module';



@NgModule({
  declarations: [
    UiDialogComponent
  ],
  imports: [
    CommonModule,
    UiButtonModule,
    UiDeleteButtonModule
  ], 
  exports: [
    UiDialogComponent
  ]
})
export class UiDialogModule { }
