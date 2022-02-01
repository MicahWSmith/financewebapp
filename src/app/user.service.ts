import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /// API USER METHODS ///
  addUser(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/users/", body);
  }

  getUser(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/users/get", body);
  }

  updateUser(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/users/update", body);
  }

  deleteUser(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/users/delete", body);
  }

  
  /// API PROFILE METHODS ///
  addProfile(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/profiles/", body);
  }

  getProfile(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/profiles/get", body);
  }

  updateProfile(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/profiles/update", body);
  }

  deleteProfile(body: {}): Observable<any>{
    return this.http.post("https://vg-db-users.herokuapp.com/profiles/delete", body);
  }

}
