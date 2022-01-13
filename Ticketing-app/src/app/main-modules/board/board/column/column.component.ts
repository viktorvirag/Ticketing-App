import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BoardsStateService } from 'src/app/main-modules/boards-screen/boards-state.service';
import { ColumnModel } from 'src/app/models/columnModel';
import { ContextMenuElement } from 'src/app/models/contextMenuElement';
import { TaskModel } from 'src/app/models/taskModel';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { DragAndDropService } from 'src/app/services/drag-and-drop.service';
import { ModalStateGlobalService } from 'src/app/services/modal-state-global.service';
import { TicketService } from 'src/app/services/ticket.service';



@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() columnFromParent: ColumnModel;
  public isCreateFormVisible: boolean = false;
  public fcTicketName: FormControl = new FormControl(null, Validators.required);

  constructor(
    public boardsStateService: BoardsStateService,
    public modalStateGlobalService: ModalStateGlobalService,
    private ticketService: TicketService,
    private contextMenuService: ContextMenuService,
    private dragAndDropService: DragAndDropService
  ) { }

  ngOnInit(): void {
    this.ticketService.getGreatestId();
  }

  toggleForm() {
    this.isCreateFormVisible = !this.isCreateFormVisible;
  }
  addNewTicket() {
    const id = this.ticketService.returnGreatestTaskId();
    const ticketToCreate = new TaskModel(
      id? id + 1 : 1,
      this.columnFromParent.id,
      this.fcTicketName.value
    );
    this.boardsStateService.addTaskToSelectedBoard(ticketToCreate);
    this.ticketService.setGreatestTaskId(ticketToCreate.id);
    this.resetForm();
  }
  callDeleteColumn(columnId: number) {
    this.boardsStateService.deleteColumn(columnId);
    this.modalStateGlobalService.closeModal('deleteDialog-' + this.columnFromParent.id)
  }
  resetForm() {
    this.fcTicketName.reset();
    this.isCreateFormVisible = false;
  }
  get modalsFromServie(): boolean {
    return this.modalStateGlobalService.modals[`deleteDialog-${this.columnFromParent.id}`]
  }
  drop(event: CdkDragDrop<TaskModel[]>, DropListData: any[]) {
    this.dragAndDropService.drop(event, DropListData);
  }
  configContextMenu($event: any, columnId: number) {
    $event.stopPropagation();
    const elementList = new Array<ContextMenuElement>();
    const deleteOption = new ContextMenuElement();
    deleteOption.title = "Delete column";
    deleteOption.method = () => {
      //ide kell egy delete dialog
      this.boardsStateService.deleteColumn(columnId);
    }
    elementList.push(deleteOption);
    this.contextMenuService.setContextMenuElements(elementList);
    const offsetY = $event.clientY + "px";
    const offsetX = $event.clientX + "px";
    this.contextMenuService.showContextMenu(offsetY, offsetX);
    return false;
  }
}
