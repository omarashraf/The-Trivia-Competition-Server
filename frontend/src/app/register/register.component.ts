import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

// imported services
import { LoginService } from '../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';

import { environment } from '../../environments/environment';

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
  ) {}

  /*
    register new user in case of a valid registration. Otherwise,
    an error is prompted to the user.
  */
  onSubmit(): void {
    if (this.username !== "" && this.username !== undefined) {
      let registrationData = 'username=' + this.username + '&email=' + this.email;
      this.errorRegistration = false;
      this.registerNewUser(registrationData, this.username);
    }
    else {
      this.errorRegistration = true;
    }
  }

  // register new user and validate that there is no error
  registerNewUser(registrationData, username): void {
    this.loginService.getCurrentUserInfo(username).subscribe((res) => {
      if (res["_body"] === "[]") {
        this.errorRegistration = false;
        this.loginService.registerNewUser(registrationData).toPromise().then((res) => {
          if (res["_body"] === "error") {
            this.errorRegistration = true;
          }
          else {
              this.errorRegistration = false;
              localStorage.setItem('current', JSON.stringify({ username: this.username, qIndex: 0 }));
              this.router.navigate(['./question']);
            }
        });
      }
      else {
        this.errorRegistration = true;
      }
    });
  }

  // destroy the previous session and remove error message if there is any
  ngOnInit() : void {
    localStorage.setItem('current', JSON.stringify({ username: '', qIndex: '' }));
    this.errorRegistration = false;
  }
}
