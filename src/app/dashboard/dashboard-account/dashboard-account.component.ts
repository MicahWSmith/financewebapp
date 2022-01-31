import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dashboard-account',
  templateUrl: './dashboard-account.component.html',
  styleUrls: ['./dashboard-account.component.scss']
})
export class DashboardAccountComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")])
  showNameEdit : boolean = false;
  showAddressEdit : boolean = false;
  showContactEdit : boolean = false;

  user = {
    id: 1,
    email: "test@test.com",
    phone: "000-000-0000",
  }

  profile = {
    first: "John",
    last: "Smith",
    ssn: "000-00-0000",
    account_number: "000784359561",
    routingNumber: "711095759",
    street_address: "123 Test St",
    city: "Philadelphia",
    state: "PA",
    userId: 1
  }

  constructor() { }

  ngOnInit(): void {
  }

  editName(){
    this.showNameEdit = true;
  }
  editAddress(){
    this.showAddressEdit = true;
  }
  editContact(){
    this.showContactEdit = true;
  }
  submitName() {
    this.showNameEdit = false;
  }
  submitAddress() {
    this.showAddressEdit = false;
  }
  submitContact(){
    this.showContactEdit = false;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


}
