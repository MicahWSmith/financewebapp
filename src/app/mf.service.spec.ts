import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MfService } from './mf.service';

describe('MfService', () => {
  let service: MfService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule],
      providers:[MfService]});
    service = TestBed.inject(MfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
