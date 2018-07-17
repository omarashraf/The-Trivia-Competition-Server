import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import "rxjs";

@Injectable()
export class AuthService {
  public headers: Headers = new Headers();
  public domain = environment.apiUrl;
  constructor(private http: Http) {
    // adding content-type for all requests in this service
    this.headers.append('Content-Type', 'application/json');
  } 
  
  AdminLogin(email, password): Observable<any> {
    return this.http.post(this.domain + "/admin/login", {email, password}, { headers: this.headers });
  }
  
  getToken() : string
  {
    return localStorage.getItem('jwtToken');
  }
}
