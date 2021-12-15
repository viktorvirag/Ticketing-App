import { Component, Input, OnInit } from '@angular/core';
import { BoardModel } from 'src/app/models/boardModel';
import { ModalStateGlobalService } from 'src/app/services/modal-state-global.service';
import { BoardsStateService } from '../../boards-state.service';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss']
})
export class BoardPreviewComponent implements OnInit {
  @Input() boardFromParent: BoardModel;
 
  constructor(
    private boardsStateService: BoardsStateService,
    public modalStateGlobalService: ModalStateGlobalService
  ) { }

  ngOnInit(): void {
  }
  deleteBoard(boardToDelete: BoardModel) {
    this.boardsStateService.deleteBoard(boardToDelete);
    this.modalStateGlobalService.closeModal('deleteDialog');
  }
  get modalsFromServie(): boolean {
    return this.modalStateGlobalService.modals[`deleteDialog-${this.boardFromParent.id}`]
  }

}
