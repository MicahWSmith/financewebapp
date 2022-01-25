import { TestBed } from '@angular/core/testing';

import { ForexAPIService } from './forex-api.service';

describe('ForexAPIService', () => {
  let service: ForexAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForexAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
