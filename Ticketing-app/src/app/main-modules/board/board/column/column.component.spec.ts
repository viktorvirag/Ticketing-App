import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnModel } from 'src/app/models/columnModel';

import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    component.columnFromParent = new ColumnModel(-1, -1, 'mock column', [], true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
