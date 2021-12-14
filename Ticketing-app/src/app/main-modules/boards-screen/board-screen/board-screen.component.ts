import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BoardModel } from 'src/app/models/boardModel';
import { ModalStateGlobalService } from 'src/app/services/modal-state-global.service';
import { BoardsStateService } from '../boards-state.service';

@Component({
  selector: 'app-board-screen',
  templateUrl: './board-screen.component.html',
  styleUrls: ['./board-screen.component.scss']
})
export class BoardScreenComponent implements OnInit {
  fcBoardName: FormControl = new FormControl(null);
  fcBoardDescription: FormControl = new FormControl(null);
 
  constructor(
    private boardsStateService: BoardsStateService,
    public modalStateGlobalService: ModalStateGlobalService
  ) { }

  ngOnInit(): void {
    this.boardsStateService.getBoards();
  }

  get boardsFromService$() {
    return this.boardsStateService.boards$
  }

  createNewBoard() {   
    let id;
    if(this.boardsStateService.returnIdOfPreviousBoard() || this.boardsStateService.returnIdOfPreviousBoard() === 0) {
      id = this.boardsStateService.returnIdOfPreviousBoard() + 1;
    } else {
      id = 0;
    }
    const newBoard = new BoardModel;
    newBoard.id = id;
    newBoard.name = this.fcBoardName.value ? this.fcBoardName.value : 'Untitled';
    newBoard.description = this.fcBoardDescription.value ? this.fcBoardDescription.value : '';
    newBoard.columnList = [];
    this.boardsStateService.createBorad(newBoard);
    this.resetCreateForm();
    this.modalStateGlobalService.closeModal('createBoardModal')
  }
  resetCreateForm() {
    this.fcBoardName.reset();
    this.fcBoardDescription.reset();
  }

}

