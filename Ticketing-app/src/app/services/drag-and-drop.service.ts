import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BoardsStateService } from '../main-modules/boards-screen/boards-state.service';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  constructor(
    private boardsStateService: BoardsStateService
  ) { }

  drop(event: CdkDragDrop<any[]>, DropListData: any[]) {
    if (event.previousContainer === event.container) {
      moveItemInArray(DropListData, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.boardsStateService.setBoardListToStorage();
  }
}
