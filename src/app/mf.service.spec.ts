import { TestBed } from '@angular/core/testing';

import { MfService } from './mf.service';

describe('MfService', () => {
  let service: MfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
