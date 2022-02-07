import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardModel } from 'src/app/models/boardModel';
import { TaskModel } from 'src/app/models/taskModel';

import { TicketComponent } from './ticket.component';

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    component.ticketFromParent = new TaskModel(-1, -1, 'mockTask');
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
  it('should retrun the name of given board', () => {
    //let board = jasmine.createSpyObj
    let boardMock = new BoardModel(-1, "mock board", "", [])
    const app = fixture.componentInstance;
    expect(component.getOptionText(boardMock)).toBe('mock board');
  })

  // it('should call stopPropagation method of given event'), () => {
  //   let mockEvent = new MouseEvent("click");
  //   expect(component.stopIt(mockEvent)).toHaveBeenCalled();
  // }
});
