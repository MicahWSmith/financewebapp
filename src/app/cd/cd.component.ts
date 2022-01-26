import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdServiceService } from '../cd-service.service';
import { Cd } from './cd.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.scss']
})
export class CdComponent implements OnInit {

  cd:Cd = {};

  constructor(private cdService: CdServiceService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.cdService.getCd(myid).subscribe(payload => {
        this.cd = payload
      })
    })
  }
  

}
