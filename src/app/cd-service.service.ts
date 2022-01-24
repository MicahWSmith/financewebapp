import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CdServiceService {
  cdurl = 'https://cd-new-db.herokuapp.com/cds';

  constructor(private http: HttpClient) {}

  getCds(): Observable<any> {
    return this.http.get(this.cdurl);
  }

  getCd(id: number): Observable<any> {
    return this.http.get(this.cdurl + id);
  }


}
