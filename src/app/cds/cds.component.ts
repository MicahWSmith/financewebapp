import { Component, OnInit } from '@angular/core';
import { CdServiceService } from '../cd-service.service';
import { Cd } from '../cd/cd.model';
import { Elcd } from '../cd/elcd.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cds',
  templateUrl: './cds.component.html',
  styleUrls: ['./cds.component.scss']
})
export class CdsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private cdService: CdServiceService, private router: Router ) { }

  cds:Cd[] = [];


  ngOnInit(): void {
    this.cdService.getCds().subscribe(payload => {
      this.cds = payload;
    })
  }




}
