import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
    selector: 'ct-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public current: String;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  getCurrentUser(): void {
    this.loginService.getSession().subscribe((res) => {
      this.current = res.json()[0]["username"];
      if (this.current === undefined || this.current === "") {
       this.getCurrentUser(); 
      }
    });
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
