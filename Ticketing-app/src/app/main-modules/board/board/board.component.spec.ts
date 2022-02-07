import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { BoardModel } from 'src/app/models/boardModel';
import { ColumnModel } from 'src/app/models/columnModel';
import { TaskModel } from 'src/app/models/taskModel';
import { BoardsStateService } from '../../boards-screen/boards-state.service';
import { BoardsStateStubService } from '../../boards-screen/boards-state.service.mock';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: BoardsStateService, useClass: BoardsStateStubService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    //there should be a list at first
    const mockTask = new TaskModel(-1, -1, 'Mock task')
    const mockColumn = new ColumnModel(-1, -1, 'Mock column', [mockTask], true);
    const mockBoard = new BoardModel(-1, 'Mock board', 'Description of mock board', [mockColumn]);

    spyOnProperty(component, 'selectedBoardFromService$', 'get').and.returnValue(of(mockBoard));
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shuld display + add new column button when the add form is NOT visible', () => {
    const addButtonElement = fixture.debugElement.query(By.css('.add-btn'));
    expect(addButtonElement.nativeElement.textContent).toBe('+ add new column');
  });

  it('shuld NOT display + add new column button when the add form is visible', () => {
    component.isFormVisible = true;
    fixture.detectChanges();
    const addButtonElement = fixture.debugElement.query(By.css('.add-btn'));
    expect(addButtonElement).toBeFalsy();
  });

  it('shuld display the name of given board in h1', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toBe('Mock board');
  });

  it('shuld display the description of given board', () => {
    const title = fixture.debugElement.query(By.css('.description'));
    expect(title.nativeElement.textContent).toBe('Description of mock board');
  });

  it('shuld display add-column form when + add new column button clicked', () => {
    const addButtonElement = fixture.debugElement.query(By.css('.add-btn'));
    addButtonElement.triggerEventHandler('clickEmitter', {});
    fixture.detectChanges();
    expect(component.isFormVisible).toEqual(true);
  });

  it('should call boardsStateService.addColumnToSelectedBoard function when create button clicked', () => {
    let boardStateStubService = TestBed.inject(BoardsStateService) as unknown as BoardsStateStubService;
    const spy = spyOn(boardStateStubService, 'addColumnToSelectedBoard');
    component.addNewColumn(-1);
    expect(spy).toHaveBeenCalled();
  });

  it('should reset form after createion', () => {
    component.fcColumnName = new FormControl('column name mock');
    component.addNewColumn(-1);
    expect(component.fcColumnName.value).toBeFalsy();
  });
});
