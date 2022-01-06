import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonComponent implements OnInit {

  @Output() clickEmitter = new EventEmitter<any>();
  @Input() disabled: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  emitClick() {
    if(!this.disabled) {
      this.clickEmitter.emit();
    }
  }

  get isDisabled() {
    return this.disabled;
  }
}
