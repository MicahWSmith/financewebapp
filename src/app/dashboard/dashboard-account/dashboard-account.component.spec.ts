import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccountComponent } from './dashboard-account.component';

describe('DashboardAccountComponent', () => {
  let component: DashboardAccountComponent;
  let fixture: ComponentFixture<DashboardAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
