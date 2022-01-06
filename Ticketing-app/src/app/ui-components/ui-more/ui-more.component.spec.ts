import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMoreComponent } from './ui-more.component';

describe('UiMoreComponent', () => {
  let component: UiMoreComponent;
  let fixture: ComponentFixture<UiMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
