import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForexMarketComponent } from './forex-market.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ForexMarketComponent', () => {
  let component: ForexMarketComponent;
  let fixture: ComponentFixture<ForexMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ ForexMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
