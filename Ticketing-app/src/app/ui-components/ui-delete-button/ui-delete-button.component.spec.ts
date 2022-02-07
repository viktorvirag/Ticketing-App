import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UiDeleteButtonComponent } from './ui-delete-button.component';

describe('UiDeleteButtonComponent', () => {
  let component: UiDeleteButtonComponent;
  let fixture: ComponentFixture<UiDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiDeleteButtonComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }); 

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when clicked', () => {
    const spy = spyOn(component.clickEmitter, 'emit');
    const element = fixture.debugElement.query(By.css('button'));
    element.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
