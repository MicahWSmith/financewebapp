import { TestBed } from '@angular/core/testing';

import { PortfolioApiService } from './portfolio-api.service';

describe('PortfolioApiService', () => {
  let service: PortfolioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
