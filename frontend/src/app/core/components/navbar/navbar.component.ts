import {
  Component,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LoginService } from '../../../shared/services/login/login.service';
import { finalize } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { ApiService } from '../../../shared/services/api/api.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;
  user: User;

  userDropdown: boolean = false;
  houseDropdown: boolean = false;
  flatDropdown: boolean = false;
  plotDropdown: boolean = false;
  roomDropdown: boolean = false;

  userDropdownMobile: boolean = false;
  houseDropdownMobile: boolean = false;
  flatDropdownMobile: boolean = false;
  plotDropdownMobile: boolean = false;
  roomDropdownMobile: boolean = false;

  mobileMenu: boolean = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.userService.getState();
    this.user = this.userService.getUser();
  }

  logout() {
    console.log('test');
    this.loginService
      .logout()
      .pipe(
        finalize(() => {
          window.location.reload();
        })
      )
      .subscribe((response) => {
        if (response.status === 204) {
          localStorage.removeItem('isLogged');
          localStorage.removeItem('user');
        }
      });
  }
}
