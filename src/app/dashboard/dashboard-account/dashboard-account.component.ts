import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model'
import { DashboardCommunicationService } from '../dashboard-communication.service';

@Component({
  selector: 'dashboard-account',
  templateUrl: './dashboard-account.component.html',
  styleUrls: ['./dashboard-account.component.scss']
})
export class DashboardAccountComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")])
  contactForm = new FormGroup({email: this.email, phone: this.phone});
  nameFirst = new FormControl('', [Validators.required]);
  nameLast = new FormControl('', [Validators.required]);
  nameForm = new FormGroup({first: this.nameFirst, last: this.nameLast});
  street = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  state = new FormControl('',[Validators.required]);
  addressForm = new FormGroup({street: this.street, city: this.city, state: this.state});
  states = ["AL","AK","AS","AZ","AR","CA","CO","CT","DE","DC","FM","FL","GA","GU","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MH", "MD","MA","MI","MN", "MS","MO","MT","NE", "NV","NH","NJ","NM","NY","NC","ND",
  "MP","OH","OK","OR","PW","PA","PR","RI","SC","SD","TN","TX","UT","VT","VI","VA","WA","WV","WI","WY"]

  showNameEdit : boolean = false;
  showAddressEdit : boolean = false;
  showContactEdit : boolean = false;
  selected : string = "";

  user = {
    id: 1,
    email: "test@test.com",
    phone: "0000000000",
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

  constructor(private dashboardCommunicationService: DashboardCommunicationService) {
    this.dashboardCommunicationService.setAccount(this);
   }

  ngOnInit(): void {
  }

  editName(){
    this.showNameEdit = true;
    this.showAddressEdit = false;
    this.showContactEdit = false;
  }
  editAddress(){
    this.showNameEdit = false;
    this.showAddressEdit = true;
    this.showContactEdit = false;
  }
  editContact(){
    this.showNameEdit = false;
    this.showAddressEdit = false;
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
  closeName() {
    this.showNameEdit = false;
  }
  closeAddress(){
    this.showAddressEdit = false;
  }
  closeContact(){
    this.showContactEdit = false;
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePhone() {
    if (this.phone.hasError('required')){
      return 'You must enter a value'
    }
    else {
      return 'Please enter 10 digits with no spaces or dashes'
    }
  }

setUser(user:User){
  this.user = user;
}
}
