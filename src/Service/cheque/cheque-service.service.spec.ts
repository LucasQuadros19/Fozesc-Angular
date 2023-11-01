import { TestBed } from '@angular/core/testing';

import { ChequeServiceService } from './cheque-service.service';

describe('ChequeServiceService', () => {
  let service: ChequeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
