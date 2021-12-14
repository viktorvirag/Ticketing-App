import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() close :EventEmitter<void> = new EventEmitter<void>();
  @Input('isCloseIcon') isCloseIcon: boolean = true;
  @Input('cardWide') cardWide: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  closeModal($event: any){
    if ($event.target.id == "layout" || $event.target.id == "close" || $event.target.id == "closeX" || $event.target.id == "closeY") {
      this.close.emit();
    }
  }
}
