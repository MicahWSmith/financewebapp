import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PortfolioApiService } from './portfolio-api.service';

describe('PortfolioApiService', () => {
  let service: PortfolioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ]
    });
    service = TestBed.inject(PortfolioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
