import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardCommunicationService } from './dashboard-communication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardCommunicationService', () => {
  let service: DashboardCommunicationService;
  let serviceSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[DashboardCommunicationService]
    });
    service = TestBed.inject(DashboardCommunicationService);
    serviceSpy = jasmine.createSpyObj('service', ['getUserFromSession']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
