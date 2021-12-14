import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardModel } from 'src/app/models/boardModel';

@Injectable({
  providedIn: 'root'
})
export class BoardsStateService {

  private readonly _boards = new BehaviorSubject<BoardModel[]>([]);
  boards$ = this._boards.asObservable();

  constructor() {
    //this.monckBoards()
  }

  getBoards() {
    const storedBoards = JSON.parse(localStorage.getItem('boardList') || '[]');
    this._boards.next(storedBoards);
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

  // monckBoards() {
  //   let csulos = [];
  //   let csul = new BoardModel();
  //   csul.id = 1;
  //   csul.description = "Hogy lettem csulos Jr10?";
  //   csul.name = "Miért lettem csul?";
  //   csul.columnList = [];
  //   csulos.push(csul);

  //   let csul2 = new BoardModel();
  //   csul2.id = 2;
  //   csul2.description = "Hogy lettem csulos Jr10?";
  //   csul2.name = "Miért lettem csul?";
  //   csul2.columnList = [];
  //   csulos.push(csul2);

  //   let csul3 = new BoardModel();
  //   csul3.id = 3;
  //   csul3.description = "ahol amúgy kifejtem h szoszi van ezzel, mert amúgy miért ne";
  //   csul3.name = "Eléggé hosszú projekt név";
  //   csul3.columnList = [];
  //   csulos.push(csul3);

  //   let csul4 = new BoardModel();
  //   csul4.id = 4;
  //   csul4.description = "Hogy lettem csulos Jr10?";
  //   csul4.name = "Miért lettem csul?";
  //   csul4.columnList = [];
  //   csulos.push(csul4);

  //   this._boards.next(csulos);
  // }
}
