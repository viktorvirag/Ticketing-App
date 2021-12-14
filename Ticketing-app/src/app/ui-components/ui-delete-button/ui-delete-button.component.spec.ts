import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDeleteButtonComponent } from './ui-delete-button.component';

describe('UiDeleteButtonComponent', () => {
  let component: UiDeleteButtonComponent;
  let fixture: ComponentFixture<UiDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiDeleteButtonComponent ]
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
});
