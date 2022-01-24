import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CdServiceService {
  cdurl = 'https://cd-new-db.herokuapp.com/cds';
  elcdurl = 'https://cd-new-db.herokuapp.com/elcds';

  constructor(private http: HttpClient) {}

  getCds(): Observable<any> {
    return this.http.get(this.cdurl);
  }

  getElcds(): Observable<any> {
    return this.http.get(this.elcdurl);
  }


  getCd(id: number): Observable<any> {
    return this.http.get(this.cdurl + id);
  }


}
