import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ui-more',
  templateUrl: './ui-more.component.html',
  styleUrls: ['./ui-more.component.scss']
})
export class UiMoreComponent implements OnInit {
  @Output() clickEmitter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  emitClick($event: any) {
    this.clickEmitter.emit($event);
  }

}
