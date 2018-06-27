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
  public verificationCodeInput: boolean = false;
  public verificationCode: number;
  public enteredCode: number;
  public verificationError: boolean = false;
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
    if (this.email !== "" && this.email !== undefined) {
      let registrationData = "email=" + this.email;
      this.errorRegistration = false;
      this.registerNewUser(registrationData, this.email);
    }
    else {
      this.errorRegistration = true;
    }
  }

  // register new user and validate that there is no error
  registerNewUser(registrationData, email): void {
    this.loginService.getCurrentUserInfo(email).subscribe((res) => {
      if (res["_body"] === "") {
        this.errorRegistration = false;
        this.loginService.registerNewUser(registrationData).subscribe((res) => {
          this.errorRegistration = false;
          localStorage.setItem('current', JSON.stringify({ email: email, qIndex: 0 }));
          this.verificationCode = JSON.parse(res["_body"])["verificationCode"];
          this.verificationCodeInput = true;
        },(err)=> {
          console.log(err);
          this.errorRegistration = true;
        });
      }
      else {
        this.verificationCode = JSON.parse(res["_body"])["verificationCode"];
        console.log(this.verificationCode);
        this.verificationCodeInput = true;
        this.errorRegistration = false;

      }
    });
  }

  validateUser(): void {
    if(this.enteredCode == this.verificationCode) {
      this.verificationCodeInput = false;
      this.router.navigate(['./question']);
    } else {
      this.verificationError = true;
    }
  }

  // destroy the previous session and remove error message if there is any
  ngOnInit() : void {
    localStorage.setItem('current', JSON.stringify({ username: '', qIndex: '' }));
    this.errorRegistration = false;
  }
}
