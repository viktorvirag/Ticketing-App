import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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

  get boardsFromService$(): Observable<BoardModel[]> {
    return this.boardsStateService.boards$
  }

  get createBoardModal() {
    return this.modalStateGlobalService.modals.createBoardModal;
  }

  openCreateBoardModal() {
    this.modalStateGlobalService.openModal('createBoardModal')
  }

  createNewBoard() {   
    const greatestBoardId = this.boardsStateService.returnIdOfPreviousBoard();
    const defaultColumns = new Array<ColumnModel>();

    const newBoard = new BoardModel(
      greatestBoardId? greatestBoardId + 1 : 1,
      this.fcBoardName.value ? this.fcBoardName.value : 'Untitled',
      this.fcBoardDescription.value ? this.fcBoardDescription.value : '',
      defaultColumns
    );
    
    const newColumn = new ColumnModel(1, newBoard.id, "New", [], true);

    const greatestId = this.ticketService.returnGreatestTaskId();
    const defaultTask = new TaskModel(
      greatestId ? greatestId + 1 : 1,
      newColumn.id,
      "Default Task",
      "description of my default task",
      8
    );
    
    newColumn.taskList.push(defaultTask);
    defaultColumns.push(newColumn);

    this.boardsStateService.createBorad(newBoard);
    this.ticketService.setGreatestTaskId(defaultTask.id);
    this.resetCreateForm();
    this.modalStateGlobalService.closeModal('createBoardModal');

  }
  
  resetCreateForm() {
    this.fcBoardName.reset();
    this.fcBoardDescription.reset();
  }

}

