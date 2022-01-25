import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IraService {

  constructor(private http:HttpClient) { }

  getTestIRA() : Observable<any> {
    return this.http.get("https://iramicroservice.herokuapp.com/iras/1");
  }

  getTestIRAFull() : Observable<any> {
    return this.http.get("https://iramicroservice.herokuapp.com/iras/full/1");
  }

  getIRA(id : number) : Observable<any> {
    return this.http.get("https://iramicroservice.herokuapp.com/iras/" + id);
  }

  getIRAFull(id : number) : Observable<any> {
    return this.http.get("https://iramicroservice.herokuapp.com/iras/full/" + id);
  }
}
