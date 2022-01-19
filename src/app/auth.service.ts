import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/login", body);
  }

  getInfoFromToken(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/auth/validate", body);
  }
}
