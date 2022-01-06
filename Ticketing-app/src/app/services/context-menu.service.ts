import { ElementRef, HostListener, Injectable, ViewChild } from '@angular/core';
import { asapScheduler, BehaviorSubject } from 'rxjs';
import { ContextMenuElement } from '../models/contextMenuElement';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  private readonly _contextMenuElements = new BehaviorSubject<ContextMenuElement[]>([]);
  contextMenuElements$ = this._contextMenuElements.asObservable();

  constructor() { }

  showContextMenu(clientY: string, clientX: string) {
    const contextMenu = document.getElementById("contextMenu");
    if(contextMenu) {
      contextMenu.style.top = clientY;
      contextMenu.style.left = clientX;
      contextMenu.classList.add("active");
    }
  }
  
  closeContextMenu() {
    const contextMenu = document.getElementById("contextMenu");
    contextMenu?.classList.add("remove");
    setTimeout(() => {
      contextMenu?.classList.remove("active");
      contextMenu?.classList.remove("remove");
    }, 200)
  }

  setContextMenuElements(element: ContextMenuElement[]) {
    this._contextMenuElements.next(element);
  }
}


