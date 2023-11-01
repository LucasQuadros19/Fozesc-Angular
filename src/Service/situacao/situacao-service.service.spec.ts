import { TestBed } from '@angular/core/testing';

import { SituacaoServiceService } from './situacao-service.service';

describe('SituacaoServiceService', () => {
  let service: SituacaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SituacaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
