import { TestBed } from '@angular/core/testing';

import { ModalStateGlobalService } from './modal-state-global.service';

describe('ModalStateGlobalService', () => {
  let service: ModalStateGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalStateGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  // fit('should open the modal', () => {
  //   let modalsMock = {
  //     mockModal: false
  //   }
  //   service.openModal('mockModal');
  //   console.log(service.modals);
  //   expect(service.modals.mockModal).toBeTrue();
  // })
});
