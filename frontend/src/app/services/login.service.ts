import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import "rxjs";

@Injectable()
export class LoginService {

  public headers: Headers = new Headers();
  public domain = "http://localhost";

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  // get the info associated with a certain user.
  getCurrentUserInfo(username: String): Observable<any> {
    let usernameBody = 'username=' + username;
    return this.http.post(this.domain + ':3000/user', usernameBody, { headers: this.headers });
  }

  // update the score of the current user.
  updateScore(scoreUser: String): Observable<any> {
    return this.http.put(this.domain + ':3000/score', scoreUser, { headers: this.headers });
  }

}
