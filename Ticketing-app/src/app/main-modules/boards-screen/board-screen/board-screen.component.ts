import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BoardModel } from 'src/app/models/boardModel';
import { ColumnModel } from 'src/app/models/columnModel';
import { TaskModel } from 'src/app/models/taskModel';
import { ModalStateGlobalService } from 'src/app/services/modal-state-global.service';
import { TicketService } from 'src/app/services/ticket.service';
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
    public modalStateGlobalService: ModalStateGlobalService,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.boardsStateService.getBoards();
    this.ticketService.getGreatestId();
  }

  get boardsFromService$() {
    return this.boardsStateService.boards$
  }

  createNewBoard() {   
    const greatestBoardId = this.boardsStateService.returnIdOfPreviousBoard();
    const newBoard = new BoardModel;
    const defaultColumns = new Array<ColumnModel>();
    const newColumn = new ColumnModel;
    newColumn.id = 1;
    newColumn.name = "New";

    const defaultTask = new TaskModel();
    const greatestId = this.ticketService.returnGreatestTaskId();
    
    defaultTask.id = greatestId ? greatestId + 1 : 1;
    defaultTask.columnId = newColumn.id;
    defaultTask.title = "Default Task";
    defaultTask.description = "description of my default task";
    defaultTask.difficulty = 8;
    defaultTask.columnId = newColumn.id;

    newColumn.taskList = [defaultTask];
    defaultColumns.push(newColumn);

    newBoard.id = greatestBoardId? greatestBoardId + 1 : 1;
    newBoard.name = this.fcBoardName.value ? this.fcBoardName.value : 'Untitled';
    newBoard.description = this.fcBoardDescription.value ? this.fcBoardDescription.value : '';
    newBoard.columnList = defaultColumns;

    this.boardsStateService.createBorad(newBoard);
    this.ticketService.setGreatestTaskId(defaultTask.id);
    this.resetCreateForm();
    this.modalStateGlobalService.closeModal('createBoardModal')

    console.log("newBoard.id", newBoard.id);
    console.log("newColumn (default)", newColumn.id);
    console.log("defaultTask.id", defaultTask.id);
  }
  resetCreateForm() {
    this.fcBoardName.reset();
    this.fcBoardDescription.reset();
  }

}

