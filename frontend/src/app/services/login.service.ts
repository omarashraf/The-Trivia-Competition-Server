import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import "rxjs";

@Injectable()
export class LoginService {

  public headers: Headers = new Headers();
  public domain = environment.apiUrl;

  constructor(private http: Http) {
    // adding content-type for all requests in this service
    this.headers.append('Content-Type', 'application/json');
  }

  // get the info associated with a certain user
  getCurrentUserInfo(email: String): Observable<any> {
    return this.http.get(this.domain + `/users/${email}`, { headers: this.headers });
  }

  // register new user
  registerNewUser(registrationData): Observable<any> {
    return this.http.post(this.domain + "/register", registrationData, { headers: this.headers });
  }

  // update the score of the current user
  updateScore(email: String, score:number): Observable<any> {
    let body = {
      "score": score
    };
    return this.http.put(this.domain + `users/${email}/score`, body, { headers: this.headers });
  }
}
