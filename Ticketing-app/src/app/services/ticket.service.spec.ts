import { TestBed } from '@angular/core/testing';

import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketService);
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('When setGreatestTaskId called, it shoud get the data from localstorage, and the returnGreatestTaskId returns the given value after setGreatestTaskIdToStorage called', () => {
    let spy = spyOn(service, 'setGreatestTaskIdToStorage');
    service.setGreatestTaskId(5);
    expect(service.returnGreatestTaskId()).toBe(5);
    expect(spy).toHaveBeenCalled();
  })
});
