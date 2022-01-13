import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BoardsStateService } from 'src/app/main-modules/boards-screen/boards-state.service';
import { BoardModel } from 'src/app/models/boardModel';
import { ContextMenuElement } from 'src/app/models/contextMenuElement';
import { TaskModel } from 'src/app/models/taskModel';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { ModalStateGlobalService } from 'src/app/services/modal-state-global.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticketFromParent: TaskModel;
  public selectBoardControl = new FormControl(null, Validators.required);
  public selectColumnControl = new FormControl(null, Validators.required);
  public moveTicketForm = new FormGroup({
    selectBoardControl: this.selectBoardControl,
    selectColumnControl: this.selectColumnControl
  });
  public filteredOptions: string[];
  public selectedBoard: BoardModel;
  constructor(
    private contextMenuService: ContextMenuService,
    private boardsStateService: BoardsStateService,
    public modalStateGlobalService: ModalStateGlobalService,
    ) {}

  ngOnInit(): void {
  }

  onRightClick($event: MouseEvent, id: number, columnId: number) {
    $event.stopPropagation();
    const elementList = new Array<ContextMenuElement>();
    const sendOption = new ContextMenuElement();
    sendOption.title = "Move ticket";
    sendOption.method = () => {
      this.modalStateGlobalService.openModal('moveTicketModal', this.ticketFromParent.id);
    }
    elementList.push(sendOption);
    const deleteOption = new ContextMenuElement();
    deleteOption.title = "Delete ticket";
    deleteOption.method = () => {
      this.boardsStateService.deleteTask(id, columnId);
    }
    elementList.push(deleteOption);
    this.contextMenuService.setContextMenuElements(elementList);
    const offsetY = $event.clientY + "px";
    const offsetX = $event.clientX + "px";
    this.contextMenuService.showContextMenu(offsetY, offsetX);
    return false;
  }
  onBoardSelect(board: BoardModel) {
    this.selectedBoard = board;
    this.moveTicketForm.controls["selectColumnControl"].reset();
    //this.selectColumnControl.reset();
  }
  callMoveTicket() {
    this.boardsStateService.moveTicket(this.ticketFromParent, (this.moveTicketForm.controls["selectBoardControl"].value).id, (this.moveTicketForm.controls["selectColumnControl"].value).id);
  }
  stopIt($event: any) {
    $event.stopPropagation();
  }
  getOptionText(option: BoardModel) {
    return option?.name;
  }
  get modalsFromServie(): boolean {
    return this.modalStateGlobalService.modals[`moveTicketModal-${this.ticketFromParent.id}`];
  }
  get boardList$(): Observable<BoardModel[]> {
    return this.boardsStateService.boards$;
  }
}
