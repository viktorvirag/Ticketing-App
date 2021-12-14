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
});
