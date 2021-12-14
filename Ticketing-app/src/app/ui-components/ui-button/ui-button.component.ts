import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonComponent implements OnInit {

  @Output() clickEmitter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  emitClick() {
    this.clickEmitter.emit();
  }

}
