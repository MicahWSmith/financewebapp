import { TestBed } from '@angular/core/testing';

import { CashAccountService } from './cash-account.service';

describe('CashAccountService', () => {
  let service: CashAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
