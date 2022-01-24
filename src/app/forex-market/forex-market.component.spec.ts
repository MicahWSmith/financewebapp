import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexMarketComponent } from './forex-market.component';

describe('ForexMarketComponent', () => {
  let component: ForexMarketComponent;
  let fixture: ComponentFixture<ForexMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
