import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StockService } from './stock.service';
import { stocks } from './stocks-test';


describe('StockService', () => {
  let service: StockService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[StockService]
    });
    service = TestBed.inject(StockService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve all stocks',() => {
    service.getStockInformation().subscribe(stocks => {
      expect(stocks).toBeTruthy();
      expect(stocks.length).toEqual(3);
      expect(stocks[0].stock_symbol).toEqual('a');
      
    })

    const request = httpTestingController.expectOne('https://boiling-falls-79972.herokuapp.com/info');

    expect(request.request.method).toBe('GET');

    request.flush(stocks);


  })
});
