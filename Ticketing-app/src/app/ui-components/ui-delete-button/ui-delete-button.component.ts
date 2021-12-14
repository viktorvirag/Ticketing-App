import { Component, OnInit } from '@angular/core';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'app-ui-delete-button',
  templateUrl: '../ui-button/ui-button.component.html',
  styleUrls: ['./ui-delete-button.component.scss']
})
export class UiDeleteButtonComponent extends UiButtonComponent{

  constructor() { 
    super();
  }
}
