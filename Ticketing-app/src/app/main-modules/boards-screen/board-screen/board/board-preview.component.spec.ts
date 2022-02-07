import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardModel } from 'src/app/models/boardModel';
import { ModalStateGlobalService } from 'src/app/services/modal-state-global.service';
import { ModalStateGlobalStubService } from 'src/app/services/modal-state-global.service.mock';
import { Location } from '@angular/common';
import { BoardPreviewComponent } from './board-preview.component';
import { By } from '@angular/platform-browser';
import { BoardsStateService } from '../../boards-state.service';
import { BoardsStateStubService } from '../../boards-state.service.mock';

describe('BoardPreviewComponent', () => {
  let component: BoardPreviewComponent;
  let fixture: ComponentFixture<BoardPreviewComponent>;
  let dh: DOMHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPreviewComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: ModalStateGlobalService, useClass: ModalStateGlobalStubService },
        { proivde: BoardsStateService, useClass: BoardsStateStubService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPreviewComponent);
    component = fixture.componentInstance;
    component.boardFromParent = new BoardModel(-1, 'mockBoard', '', []);
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  describe('Template tests', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display the title of the given board', () => {
      expect(dh.singleText('.board-title')).toBe(component.boardFromParent.name);
    });

    it('should display the description of the given board, if it has any', () => {
      expect(dh.singleText('.board-text')).toBe(component.boardFromParent.description);
    });

  })

  describe('Navigation', () => {
    let location: Location;
    let router: Router;
    beforeEach(() => {
      location = TestBed.inject(Location);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });
    // Navigation
    it('Should be at baseURL before clicking nav button',
      () => {
        // find DebugElements with an attached RouterLinkStubDirective
        expect(location.path()).toBe('');
      }
    );

    it('Should navigate to /add on + button click',
      () => {
        spyOn(router, 'navigateByUrl');
        dh.clickButton('open');
        expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['../board', component.boardFromParent.id]),
          { skipLocationChange: false, replaceUrl: false, state: undefined });
      });

  });

  describe('Functionality', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should open deleteDialog when clicked', (() => {
      const spy = spyOn(component, 'openDeleteDialog');
      const element = fixture.debugElement.query(By.css('app-ui-delete-button'));
      element.triggerEventHandler('clickEmitter', {});
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    }))

    it('when deleteBoard() called, it should call service.deleteBoard and when deleteBoard() called, it should close the modal', () => {
      let boardStateStubService = TestBed.inject(BoardsStateService) as unknown as BoardsStateStubService;
      let modalStateGlobalStubService = TestBed.inject(ModalStateGlobalService) as unknown as ModalStateGlobalStubService;
      const spy = spyOn(boardStateStubService, 'deleteBoard');
      const spy2 = spyOn(modalStateGlobalStubService, 'closeModal');
      component.deleteBoard(component.boardFromParent);
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });

    it('should call service.delete with the given board model when dete confirmation clicked', () => {
      const element = fixture.debugElement.query(By.css('app-ui-delete-button'));
      element.triggerEventHandler('clickEmitter', {});
      fixture.detectChanges();
      const spy = spyOn(component, 'deleteBoard');
      const element2 = fixture.debugElement.query(By.css('app-ui-dialog'));
      element2.triggerEventHandler('confirmClickEmitter', {});
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(component.boardFromParent);
    })

    it('should close the popup when cancel clicked from dialog', () => {
      const element = fixture.debugElement.query(By.css('app-ui-delete-button'));
      element.triggerEventHandler('clickEmitter', {});
      fixture.detectChanges();
      let modalStateGlobalStubService = TestBed.inject(ModalStateGlobalService) as unknown as ModalStateGlobalStubService;
      const spy = spyOn(modalStateGlobalStubService, 'closeModal');
      const element2 = fixture.debugElement.query(By.css('app-ui-dialog'));
      element2.triggerEventHandler('backClickEmitter', {});
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith('deleteDialog-' + component.boardFromParent.id);
    });
  })


});

class DOMHelper {
  private fixture: ComponentFixture<BoardPreviewComponent>
  constructor(fixture: ComponentFixture<BoardPreviewComponent>) {
    this.fixture = fixture;
  }

  singleText(tagName: string): string {
    const el = this.fixture.debugElement.query(By.css(tagName)); 
    if (el) {
      return el.nativeElement.textContent;
    } else {
      return '';
    }
  }

  clickButton(buttonText: string) {
    this.findAll('app-ui-button').forEach(button => {
      const buttonElement: HTMLElement = button.nativeElement;
      console.log(buttonElement.innerText, buttonText);
      buttonElement.click();
    });
  }

  findAll(tagName: string) {
    return this.fixture.debugElement
      .queryAll(By.css(tagName)); 
  }
}
