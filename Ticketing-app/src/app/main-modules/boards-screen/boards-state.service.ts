import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardModel } from 'src/app/models/boardModel';

@Injectable({
  providedIn: 'root'
})
export class BoardsStateService {

  private readonly _boards = new BehaviorSubject<BoardModel[]>([]);
  boards$ = this._boards.asObservable();

  private readonly _selectedBoard = new BehaviorSubject<BoardModel>(new BoardModel());
  selectedBoard$ = this._selectedBoard.asObservable();

  constructor() {
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

  createBorad(newBoard: BoardModel) {
    let boardList = this._boards.getValue();
    boardList.unshift(newBoard)
    this._boards.next(boardList);
    localStorage.setItem('boardList', JSON.stringify(this._boards.getValue()));
  }

  deleteBoard(boardToDelete: BoardModel) {
    let indexToDelete = this._boards.getValue().findIndex(board => board.id === boardToDelete.id);
    if(indexToDelete != -1) {
      let boardList = this._boards.getValue();
      boardList.splice(indexToDelete, 1);
      this._boards.next(boardList);
      localStorage.setItem('boardList', JSON.stringify(this._boards.getValue()));
    }
  }
  returnIdOfPreviousBoard() {
    return this._boards.getValue()[0]?.id;
  }
}
