import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ColumnModel } from 'src/app/models/columnModel';
import { DragAndDropService } from 'src/app/services/drag-and-drop.service';
import { BoardsStateService } from '../../boards-screen/boards-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  fcColumnName: FormControl = new FormControl(null, Validators.required);
  isFormVisible: boolean = false;
  @ViewChild('target') targetElement: ElementRef;
  constructor(
    public boardsStateService: BoardsStateService,
    private route: ActivatedRoute,
    private dragAndDropService: DragAndDropService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let paramString = params.get('id');
      if(paramString) {
        this.boardsStateService.getBoardById(parseInt(paramString));
      }      
  });
  } 
  ngAfterViewInit() {
  }
  get selectedBoardFromService$() {
    return this.boardsStateService.selectedBoard$
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  toggleForm() {
    this.targetElement.nativeElement.scrollIntoView({behavior: "smooth"});
    this.isFormVisible = !this.isFormVisible;
  }
  addNewColumn(boardId: number) {
    let columnToCreate = new ColumnModel(-1, boardId, this.fcColumnName.value, [], true);
    columnToCreate.boardId = boardId;
    columnToCreate.taskList =[];
    columnToCreate.name = this.fcColumnName.value;
    this.boardsStateService.addColumnToSelectedBoard(columnToCreate);
    this.resetForm();
  }
  resetForm() {
    this.fcColumnName.reset();
    this.isFormVisible = false;
  }
  drop(event: CdkDragDrop<any[]>, DropListData: any[]) {
    this.dragAndDropService.drop(event, DropListData);
  }
  isFormControlValid(): boolean {
    return this.fcColumnName.valid;
  }

}
