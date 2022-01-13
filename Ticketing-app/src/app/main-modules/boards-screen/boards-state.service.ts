import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardModel } from 'src/app/models/boardModel';
import { ColumnModel } from 'src/app/models/columnModel';
import { TaskModel } from 'src/app/models/taskModel';
import { ModalStateGlobalService } from 'src/app/services/modal-state-global.service';
import { TicketService } from 'src/app/services/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsStateService {

  private readonly _boards = new BehaviorSubject<BoardModel[]>([]);
  boards$ = this._boards.asObservable();

  private readonly _selectedBoard = new BehaviorSubject<BoardModel>({} as BoardModel);
  selectedBoard$ = this._selectedBoard.asObservable();

  constructor(
    private ticketService: TicketService,
    private modalStateGlobalService: ModalStateGlobalService
    ) {
  }

  getBoards() {
    const storedBoards = JSON.parse(localStorage.getItem('boardList') || '[]');
    this._boards.next(storedBoards);
  }
  
  getBoardById(id: number) {
    this.getBoards();
    let indexOfSelectedBoard = this._boards.getValue().findIndex((board) => board.id === id);
    if(indexOfSelectedBoard !== -1) {
      this._selectedBoard.next(this._boards.getValue()[indexOfSelectedBoard]);
    }
  }

  addColumnToSelectedBoard(column: ColumnModel) {
    const currentBoard = this._selectedBoard.getValue();
    const greatestColumnId = this.returnGreatestColumnId(this._selectedBoard.getValue());
    column.id = greatestColumnId ? greatestColumnId + 1 : 1;
    currentBoard.columnList.push(column);
    this.setBoardListToStorage();
  }

  addTaskToSelectedBoard(task: TaskModel) {
    const currentBoard = this._selectedBoard.getValue();
    const indexOfTargetColumn = currentBoard.columnList.findIndex(column => column.id === task.columnId);
    if(indexOfTargetColumn !== -1) {
      //task.id = this.returnIdOfPreviousTicket();
      this.ticketService.setGreatestTaskId(task.id);
      currentBoard.columnList[indexOfTargetColumn].taskList.push(task);
      this.setBoardListToStorage();
     
    }
  }

  deleteTask(id: number, columnId: number) {
    const currentBoard = this._selectedBoard.getValue();
    const indexOfTargetColumn = currentBoard.columnList.findIndex(column => column.id === columnId);
    if (indexOfTargetColumn !== -1) {
      const taskHolderColumn = currentBoard.columnList[indexOfTargetColumn];
      const indexOfTargetTask = taskHolderColumn.taskList.findIndex(column => column.id === id);
      if (indexOfTargetTask !== -1) {
        currentBoard.columnList[indexOfTargetColumn].taskList.splice(indexOfTargetTask, 1);
        this.setBoardListToStorage();
      }
    }
  }

  deleteColumn(columnId: number) {
    const currentBoard = this._selectedBoard.getValue();
    const indexToDelete = currentBoard.columnList.findIndex(column => column.id === columnId);
    if(indexToDelete !== -1) {
      currentBoard.columnList.splice(indexToDelete, 1);
      this.setBoardListToStorage();
    }
  }

  createBorad(newBoard: BoardModel) {
    const boardList = this._boards.getValue();
    boardList.unshift(newBoard)
    this._boards.next(boardList);
    localStorage.setItem('boardList', JSON.stringify(this._boards.getValue()));
  }

  deleteBoard(boardToDelete: BoardModel) {
    const indexToDelete = this._boards.getValue().findIndex(board => board.id === boardToDelete.id);
    if(indexToDelete !== -1) {
      let boardList = this._boards.getValue();
      boardList.splice(indexToDelete, 1);
      this._boards.next(boardList);
      localStorage.setItem('boardList', JSON.stringify(this._boards.getValue()));
    }
  }

  moveTicket(ticket: TaskModel, targetBoardId: number, targetColumnId: number) {
    //be kell tenni az új helyre
    const boardList = this._boards.getValue();
    const indexOfTargetBoard = boardList.findIndex(b => b.id === targetBoardId);
    const indexOfTargetColumn = boardList[indexOfTargetBoard].columnList.findIndex(c => c.id === targetColumnId);
    if (indexOfTargetBoard !== -1 && indexOfTargetColumn !== -1) {
      boardList[indexOfTargetBoard].columnList[indexOfTargetColumn].taskList.push(ticket);
      //ha megvolt, ki kell szedni a régiből
      const currentBoard = this._selectedBoard.getValue();
      const indexOfColumnToSplice = currentBoard.columnList.findIndex(c => c.id === ticket.columnId);
      if(indexOfColumnToSplice !== -1) {
        const indexToDelete = currentBoard.columnList[indexOfColumnToSplice].taskList.findIndex(t => t.id === ticket.id);
        if (indexToDelete!== -1){
          currentBoard.columnList[indexOfColumnToSplice].taskList.splice(indexToDelete, 1);
          //frissíteni a ticket.columnId-t
          ticket.columnId = targetColumnId;
          //frissíteni a storage-et
          this.setBoardListToStorage();
          //bezárni a popup-ot
          this.modalStateGlobalService.closeModal('moveTicketModal-' + ticket.id);
        }
      }
    }
  }

  setBoardListToStorage(): void {
    localStorage.setItem('boardList', JSON.stringify(this._boards.getValue()));
  }

  returnIdOfPreviousBoard(): number {
    return this._boards.getValue()[0]?.id;
  }

  returnGreatestColumnId(board: BoardModel) {
    const boardClone = new BoardModel(board.id, board.name, board.description, [...board.columnList]);
    const sortedArray = boardClone.columnList.sort((a, b) => {
      return a.id - b.id;
    });
    return sortedArray[sortedArray.length -1].id;
  }

  updateSelectedBoard(board: BoardModel): void {
    this._selectedBoard.next(board);
  }

}
