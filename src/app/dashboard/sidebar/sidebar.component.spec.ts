import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/app/models/user.model';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        RouterTestingModule],
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set properties based off the current user', () => {

      let user : User = {
        email: "user@test.com",
        first: "test",
        id: 1,
        last: "user",
        phone: "2222222222",
        profile: {
          id: 1,
          ssn: "",
          account_number: "",
          routing_number: "",
          street_address: "",
          city: "",
          state: "",
          userId: 1
        },
        security_answer: "",
        security_question: "" 
      }

      component.setUser(user);

      expect(component.User).toEqual(user);
      expect(component.firstName).toEqual(user.first);
      expect(component.gotUser).toBeTruthy();
      
    })

    
});
