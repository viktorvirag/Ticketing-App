import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ui-dialog',
  templateUrl: './ui-dialog.component.html',
  styleUrls: ['./ui-dialog.component.scss']
})
export class UiDialogComponent implements OnInit {
  @Input() dialogText: string;
  @Input() warningText: string | null = null;
  @Input() confirmButtonText: string;
  @Input() backButtonText: string;

  @Output() backClickEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmClickEmitter: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  backClicked() {
    this.backClickEmitter.emit();
  }
  confirmClicked() {
    this.confirmClickEmitter.emit();
  }

}
