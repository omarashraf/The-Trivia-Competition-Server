import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'ct-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public current: String;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  getCurrentUser(): void {
    this.current = JSON.parse(localStorage.getItem('current'))["username"];
  }

  ngOnInit(): void {
    if (this.router.url === "/leaderboard" || this.router.url === "/register") {
      this.current = "";
    }
    else {
      this.getCurrentUser();
    }
  }

}
