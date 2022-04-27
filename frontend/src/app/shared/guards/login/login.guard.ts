import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../../services/login/login.service";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService, private location: Location) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    if(localStorage.getItem('isLogged')==='true'){
      this.location.back();
      return false;
    }
    else return true;

  }

}
