import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ForexAPIService } from './forex-api.service';

describe('ForexAPIService', () => {
  let service: ForexAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ]
    });
    service = TestBed.inject(ForexAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
