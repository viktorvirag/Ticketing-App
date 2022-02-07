import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BoardModel } from 'src/app/models/boardModel';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketStubService } from 'src/app/services/ticket.service.mock';
import { BoardsStateService } from '../boards-state.service';
import { BoardsStateStubService } from '../boards-state.service.mock';

import { BoardScreenComponent } from './board-screen.component';

describe('BoardScreenComponent', () => {
  let component: BoardScreenComponent;
  let fixture: ComponentFixture<BoardScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardScreenComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [ 
        { proivde: BoardsStateService, useClass: BoardsStateStubService } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //valóban annyi van kirajzolódva, ahány board van
  it('should show the right amount of boards in the list', () => {
    const mockList: Array<BoardModel> = [
      new BoardModel(-1, 'Mock board 1', '', []),
      new BoardModel(-2, 'Mock board 2', '', [])
    ]
    spyOnProperty(component, 'boardsFromService$', 'get').and.returnValue(of(mockList));
    fixture.detectChanges();
    const boardPreviewElements = fixture.debugElement.queryAll(By.css('app-board-preview'));
    expect(boardPreviewElements.length).toEqual(mockList.length);
  });

  // hozzáadás gomb megjelenik
  it('shuld always display + button to add new board', () => {
    const addButtonElement = fixture.debugElement.query(By.css('.add-button'));
    expect(addButtonElement.nativeElement.textContent).toBe('+');
  });
  //hozzáadás gomb megnyomására megjelenik a popup
  it('should call the openCreateBoardModal method when + button clicked', () => {
    const spy = spyOn(component, 'openCreateBoardModal'); 
    const addButtonElement = fixture.debugElement.query(By.css('.add-button'));
    addButtonElement.triggerEventHandler('clickEmitter', {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should open the create board modal when + button clicked', () => {
    spyOnProperty(component, 'createBoardModal', 'get').and.returnValue({createBoardModal: true});
    fixture.detectChanges();
    const createModal = fixture.debugElement.query(By.css('app-modal'));
    expect(createModal).toBeTruthy();
  });

  //create gomb megnyomására lefut a createNewBoard függvény 
  it('should run createNewBoard function when create clicked', () => {
    spyOnProperty(component, 'createBoardModal', 'get').and.returnValue({createBoardModal: true});
    const spy = spyOn(component, 'createNewBoard');
    fixture.detectChanges();
    const createButtonElement = fixture.debugElement.query(By.css('.create-button'));
    createButtonElement.triggerEventHandler('clickEmitter', {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });  

//createNewBoard részletes tesztelése
  it('should call boardStateStubService.createBorad, ticketStubService.setGreatestTaskId', () => {
    let boardStateStubService = TestBed.inject(BoardsStateService) as unknown as BoardsStateStubService;
    let ticketStubService = TestBed.inject(TicketService) as unknown as TicketStubService;
    const spy = spyOn(boardStateStubService, 'createBorad');
    const spy2 = spyOn(ticketStubService, 'setGreatestTaskId');
    spyOnProperty(component, 'createBoardModal', 'get').and.returnValue({createBoardModal: true});
    fixture.detectChanges();
    const createButtonElement = fixture.debugElement.query(By.css('.create-button'));
    createButtonElement.triggerEventHandler('clickEmitter', {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('shuld use the values of formcontrols as name and description', () => {
    let newBoard: BoardModel = new BoardModel(-1, 'asd', '', []);
    const mockNameControl = new FormControl('Mock Boardname');
    const mockDescriptionControl = new FormControl('Mock Description');
    component.fcBoardName = mockNameControl;
    component.fcBoardDescription = mockDescriptionControl;

    let boardStateStubService = TestBed.inject(BoardsStateService) as unknown as BoardsStateStubService;
    const spy = spyOn(boardStateStubService, 'createBorad').and.callFake((arg: BoardModel)=> {
      newBoard = arg;
    });
    component.createNewBoard();
    expect(spy).toHaveBeenCalled();
    expect(newBoard.name).toBe('Mock Boardname');
    expect(newBoard.description).toBe('Mock Description');
  });

  it('should reset the formcontrols after create', () => {
    const mockNameControl = new FormControl('Mock Boardname');
    const mockDescriptionControl = new FormControl('Mock Description');
    component.fcBoardName = mockNameControl;
    component.fcBoardDescription = mockDescriptionControl;
    spyOnProperty(component, 'createBoardModal', 'get').and.returnValue({createBoardModal: true});
    component.createNewBoard();
    expect(component.fcBoardDescription.value).toEqual(null);
  });

});
