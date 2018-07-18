import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor
  (
    private router: Router, 
    private AdminService: AdminService
    ) {}

  canActivate() 
  {
    if (localStorage.getItem('jwtToken') !== null )
    {
        return true;
    }
    this.router.navigate(['./admin/login']);
    console.log('HERE')
    return false;
  }
}