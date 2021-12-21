import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardModel } from 'src/app/models/boardModel';
import { ColumnModel } from 'src/app/models/columnModel';
import { TaskModel } from 'src/app/models/taskModel';
import { TicketService } from 'src/app/services/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsStateService {

  private readonly _boards = new BehaviorSubject<BoardModel[]>([]);
  boards$ = this._boards.asObservable();

  private readonly _selectedBoard = new BehaviorSubject<BoardModel>(new BoardModel());
  selectedBoard$ = this._selectedBoard.asObservable();

  constructor(private ticketService: TicketService) {
  }

  getBoards() {
    const storedBoards = JSON.parse(localStorage.getItem('boardList') || '[]');
    this._boards.next(storedBoards);
  }
  
  getBoardById(id: number) {
    this.getBoards();
    let indexOfSelectedBoard = this._boards.getValue().findIndex((board) => board.id === id);
    if(indexOfSelectedBoard != -1) {
      this._selectedBoard.next(this._boards.getValue()[indexOfSelectedBoard]);
    }
  }

  addColumnToSelectedBoard(column: ColumnModel) {
    const currentBoard = this._selectedBoard.getValue();
    const greatestColumnId = this.returnIdOfPreviousColumn(currentBoard)
    column.id = greatestColumnId ? greatestColumnId + 1 : 1;
    currentBoard.columnList.push(column);
    // itt már friss mindkét observable
    console.log("_selectedBoard", this._selectedBoard.getValue(),"currentBoard.columnList.push",this._boards.getValue());
    this.setBoardListToStorage();
  }

  addTaskToSelectedBoard(task: TaskModel) {
    const currentBoard = this._selectedBoard.getValue();
    const indexOfTargetColumn = currentBoard.columnList.findIndex(column => column.id === task.columnId);
    if(indexOfTargetColumn != -1) {
      //task.id = this.returnIdOfPreviousTicket();
      this.ticketService.setGreatestTaskId(task.id);
      currentBoard.columnList[indexOfTargetColumn].taskList.push(task);
      console.log("végén az id", task.id);
      this.setBoardListToStorage();
     
    }
  }

  deleteColumn(columnId: number) {
    const currentBoard = this._selectedBoard.getValue();
    const indexToDelete = currentBoard.columnList.findIndex(column => column.id === columnId);
    if(indexToDelete != -1) {
      currentBoard.columnList.splice(indexToDelete, 1);
      this.setBoardListToStorage();
      console.log("selectedBoard:", this._selectedBoard.getValue(), "boardList:", this._boards.getValue());
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
    if(indexToDelete != -1) {
      let boardList = this._boards.getValue();
      boardList.splice(indexToDelete, 1);
      this._boards.next(boardList);
      localStorage.setItem('boardList', JSON.stringify(this._boards.getValue()));
    }
  }
  setBoardListToStorage(): void {
    localStorage.setItem('boardList', JSON.stringify(this._boards.getValue()));
  }
  returnIdOfPreviousBoard(): number {
    return this._boards.getValue()[0]?.id;
  }
  returnIdOfPreviousColumn(board: BoardModel): number {
    return board.columnList[board.columnList.length - 1]?.id;
  }
  updateSelectedBoard(board: BoardModel): void {
    this._selectedBoard.next(board);
  }
}
