import { TestBed } from '@angular/core/testing';

import { CdServiceService } from './cd-service.service';

describe('CdServiceService', () => {
  let service: CdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
