import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsComponent } from './cds.component';

describe('CdsComponent', () => {
  let component: CdsComponent;
  let fixture: ComponentFixture<CdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
