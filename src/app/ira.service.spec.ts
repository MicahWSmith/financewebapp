import { TestBed } from '@angular/core/testing';

import { IraService } from './ira.service';

describe('IraService', () => {
  let service: IraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
