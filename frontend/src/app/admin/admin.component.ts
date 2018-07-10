import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

// imported services
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from 'angular-2-local-storage';

import { environment } from '../../environments/environment';

@Component({
  selector: 'admin-comp',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    public username: string;
    public email: string;
    public password: string;
    public score: number;
    public errorRegistration: boolean = false;
    public verificationCodeInput: boolean = false;
    public verificationCode: number;
    public enteredCode: number;
    public verificationError: boolean = false;
    public headers: Headers = new Headers();

    constructor(
    private http: Http,
    private AuthService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService 
    ) {}
    onSubmitAdmin(): void {
        console.log(this.email + "..." + this.password);
        if (
            this.email !== "" && 
            this.email !== undefined && 
            this.password !== "" && 
            this.password !== undefined) {
                
                this.AuthService.AdminLogin(this.email, this.password).subscribe((res) => {
                    console.log(res);
                  });
        }
        else {
          this.errorRegistration = true;
        }
    }
    ngOnInit() : void {
        localStorage.setItem('current', JSON.stringify({ email: '', qIndex: '' }));
        this.errorRegistration = false;
    }
}