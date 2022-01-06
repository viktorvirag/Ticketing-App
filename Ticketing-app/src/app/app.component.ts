import { Component, HostListener } from '@angular/core';
import { ContextMenuService } from './services/context-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ticketing-app';
  @HostListener('click') callback() {
    this.contextMenuService.closeContextMenu()
  }
  constructor(public contextMenuService: ContextMenuService) {
  }
}
