import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedIn: boolean = false;
  constructor() { }

  ngOnInit(): void {
    let session = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : "";

    if(session != ""){
      this.loggedIn = true;
    }
  }

}
