import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

// imported services
import { LoginService } from '../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'register-comp',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username: string;
  public email: string;
  public score: number;
  public errorRegistration: boolean = false;
  public headers: Headers = new Headers();

  constructor(
    private http: Http,
    private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService 
  ) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  /*
    register new user in case of a valid registration. Otherwise,
    an error is prompted to the user.
  */
  onSubmit(): void {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.email) && this.username !== "" && this.username !== undefined) {
      let registrationData = 'username=' + this.username + '&email=' + this.email;
      this.registerNewUser(registrationData);
    }
    else {
      this.errorRegistration = true;
    }
  }

  // register new user and validate that there is no error
  registerNewUser(registrationData): void {
    this.http.post("http://35.161.224.180:3000/register", registrationData, { headers: this.headers }).toPromise().then((res) => {
      console.log("RES --> ", res["_body"]);
      if (res["_body"] === "error") {
        this.errorRegistration = true;
      }
      else {
          let newSession = "username=" + this.username;
          this.errorRegistration = false;
          // this.loginService.setSession(newSession);
          localStorage.setItem('current', JSON.stringify({ username: this.username, qIndex: 0 }));
          this.router.navigate(['./question']);
        }
    });
  }

  // on init component -> destroy the previous session
  ngOnInit() : void {
    // this.loginService.destroySession().subscribe();
    localStorage.setItem('current', JSON.stringify({ username: '', qIndex: '' }));
  }
}
