import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMessagesComponent } from './dashboard-messages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardMessagesComponent', () => {
  let component: DashboardMessagesComponent;
  let fixture: ComponentFixture<DashboardMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        RouterTestingModule],
      declarations: [ DashboardMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
