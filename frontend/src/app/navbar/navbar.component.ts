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
  public isAdmin: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  // get current user stored in localStorage
  getCurrentUser(): void {
    this.current = JSON.parse(localStorage.getItem('current'))["username"];
  }

  // username is set in nav bar if the user is now playing/viewing leaderboard
  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    if (this.router.url === "/leaderboard" || this.router.url === "/register") {
      this.current = "";
    }
    else {
      this.getCurrentUser();
    }
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['./admin/login']);
  }
}
