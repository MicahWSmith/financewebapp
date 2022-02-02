import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IraService } from './ira.service';

describe('IraService', () => {
  let service: IraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[IraService]
    });
    service = TestBed.inject(IraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
