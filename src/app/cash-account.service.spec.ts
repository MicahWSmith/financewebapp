import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CashAccountService } from './cash-account.service';

describe('CashAccountService', () => {
  let service: CashAccountService;
  let httpTestControl : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CashAccountService]
    });

    service = TestBed.inject(CashAccountService);
    httpTestControl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the first account', () => {
    service.getAccount(1).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.length).toBe(1);
    })

    const req = httpTestControl.expectOne("https://bankaccountmicroservice.herokuapp.com/accounts/1");
    expect(req.request.method).toEqual('GET');
    req.flush([ //need []?
      {
        "id": 1,
        "balance": 3001,
        "accountNumber": "000784359561",
        "routingNumber": "711095759",
        "userId": 1,
        "createdAt": "2022-01-19T22:21:36.711Z",
        "updatedAt": "2022-01-27T20:18:18.114Z"
    }
  ]);
    httpTestControl.verify();
  });
  
});
