import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ContextMenuService } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  constructor(public contextMenuService: ContextMenuService) { }

  ngOnInit(): void {
  }

  get contextMenuElements$ () {
    return this.contextMenuService.contextMenuElements$;
  }
  

}
