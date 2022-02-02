import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CdServiceService } from './cd-service.service';

describe('CdServiceService', () => {
  let service: CdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(CdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
