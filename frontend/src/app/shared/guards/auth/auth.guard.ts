import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService
  ) {}
  canActivate(): boolean {
    this.ngxPermissionsService.loadPermissions(
      JSON.parse(localStorage.getItem('app.permissions') || '[]')
    );
    if (!this.userService.getState()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
