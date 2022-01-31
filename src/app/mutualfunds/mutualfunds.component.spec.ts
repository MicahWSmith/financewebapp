import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualfundsComponent } from './mutualfunds.component';

describe('MutualfundsComponent', () => {
  let component: MutualfundsComponent;
  let fixture: ComponentFixture<MutualfundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualfundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualfundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
