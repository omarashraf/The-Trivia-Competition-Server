import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import "rxjs";

@Injectable()
export class AdminService {
  public headers: Headers = new Headers();
  public domain = environment.apiUrl;
  constructor(private http: Http) {
    // adding content-type for all requests in this service
    this.headers.append('Content-Type', 'application/json');
  } 
  login(email, password): Observable<any> {
    return this.http.post(this.domain + "/admin/login", {email, password}, { headers: this.headers });
  }
  getToken() : string {
    return localStorage.getItem('jwtToken');
  }
  getStats(): Observable<any> {
    this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
    return this.http.get(this.domain + '/admin/stats', {headers: this.headers});
  }
  iniviteAdmin(email): Observable<any> {
    this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
    return this.http.post(this.domain + '/admin/invite',{email}, {headers: this.headers});
  }
}
