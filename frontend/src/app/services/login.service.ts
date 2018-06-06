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

  // set session params to those of the current user.
  setSession(session: String): void {
    this.http.put(this.domain + ':3000/session', session, { headers: this.headers }).subscribe((res) => {
    });
  }

  // get current session info of the current user.
  getSession(): Observable<any> {
    return this.http.get(this.domain + ':3000/session');
  }

  // destroy the session info of the current user.
  destroySession(): Observable<any> {
    let username = "";
    let newSession = "username=" + username;
    return this.http.put(this.domain + ':3000/session', newSession, { headers: this.headers });
  }

  // update session info of the current user.
  updateSession(session: String): void {
    this.http.put(this.domain + ':3000/session', session, { headers: this.headers}).subscribe((res) => {
    });
  }

  // get the info associated with a certain user.
  getCurrentUserInfo(username: String): Observable<any> {
    console.log("Login service");
    let usernameBody = 'username=' + username;
    return this.http.post(this.domain + ':3000/user', usernameBody, { headers: this.headers });
  }

  // update the score of the current user.
  updateScore(scoreUser: String): Observable<any> {
    return this.http.put(this.domain + ':3000/score', scoreUser, { headers: this.headers });
  }

}
