import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMoreComponent } from './ui-more.component';

describe('UiMoreComponent', () => {
  //all Jasmine tests happen inside the describe
  // the first argument is a string, which describes the collection of tests we want to run
  // the second one is an arrow function, which holds all our test methods
  let component: UiMoreComponent;
  //it is let, because we need to instantiate a new instance of our service each time we run a test, using Jasmine's beforeEach()
  let fixture: ComponentFixture<UiMoreComponent>;
  //this method runs before every test from the describe block
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
  //we declare the test logic using Jasmine's It function
  //the first argument is a string which we describe the expexted behaviour
  //the second argument is a callback function with all our test logic
  it('should create', () => {
    //expect's argument is the value we want to check
    expect(component).toBeTruthy();
  });
});
