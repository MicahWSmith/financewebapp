import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../../models/user.model'
import { DashboardCommunicationService } from '../dashboard-communication.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UserService } from 'src/app/user.service';

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
  user!:User;

  constructor(private dbComm: DashboardCommunicationService, public dialog: MatDialog, private userService: UserService) {
    this.dbComm.setAccount(this);
   }
  ngOnInit(): void {
    this.dbComm.getUserFromSession();
    console.log(sessionStorage.getItem('user'));
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
    let body = {
      token: sessionStorage.getItem('user'),
      first: this.nameFirst.value,
      last: this.nameLast.value,
      email: this.user.email,
      phone: this.user.phone

    }
    this.userService.updateUser(body).subscribe(response => {
      this.showNameEdit = false;
      this.ngOnInit();
    });
  }
  submitAddress() {
    let body = {
      token: sessionStorage.getItem('user'),
      street_address: this.street.value,
      city: this.city.value,
      state: this.state.value
    }
    this.userService.updateProfile(body).subscribe(response => {
      this.showAddressEdit = false;
      this.ngOnInit();
    })
  }
  submitContact(){
    let body = {
      token: sessionStorage.getItem('user'),
      first: this.user.first,
      last: this.user.last,
      email: this.email.value,
      phone: this.phone.value

    }
    this.userService.updateUser(body).subscribe(response => {
      this.showContactEdit = false;
      this.ngOnInit();
    });
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

  openConfirm(){
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if (response === "Delete Confirmed"){
        console.log("Confirm Delete button pressed");
        this.deleteAccount();
      }
    })
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

  deleteAccount(){
    let body = {
      token: sessionStorage.getItem('user')
    }
    console.log("body of delete request:", body);
    this.userService.deleteUser(body).subscribe(response => {
      console.log(response);
      this.dbComm.logout();
    })
  }
}
