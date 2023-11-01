import { TestBed } from '@angular/core/testing';

import { BancoserviceService } from './bancoservice.service';

describe('BancoserviceService', () => {
  let service: BancoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
