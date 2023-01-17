import {
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { LoginService } from '../../../shared/services/login/login.service';
import { finalize, Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { OfferService } from '../../../shared/services/offer/offer.service';
import { User } from '../../../shared/models/user';
import { CookieService } from 'ngx-cookie-service';
import { ReloadDataTriggerService } from '../../../shared/services/reload-data-trigger/reload-data-trigger.service';
import { NavbarService } from '../../../shared/services/navbar/navbar.service';
import { NgxPermissionsService } from 'ngx-permissions';
import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { DropDownAnimation } from '../../../shared/animations/dropdown-animation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [DropDownAnimation],
})
export class NavbarComponent implements OnInit, OnDestroy {
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
  reloadUserNavbarInfoSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private cookieService: CookieService,
    private reloadDataTrigger: ReloadDataTriggerService,
    public navbarService: NavbarService,
    private ngxPermissions: NgxPermissionsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.userService.getState();
    this.user = this.userService.getUser();
    this.listenOnUserNavbarInfoReloadTrigger();
  }

  ngOnDestroy() {
    this.reloadUserNavbarInfoSubscription.unsubscribe();
  }

  logout() {
    this.loginService
      .logout()
      .pipe(
        finalize(() => {
          window.location.reload();
        })
      )
      .subscribe((response) => {
        if (response.status === 204) {
          // this.cookieService.deleteAll('/', 'localhost');
          this.ngxPermissions.flushPermissions();
          localStorage.removeItem('app.permissions');
          localStorage.removeItem('isLogged');
          localStorage.removeItem('user');
        }
      });
  }

  private listenOnUserNavbarInfoReloadTrigger() {
    this.reloadUserNavbarInfoSubscription =
      this.reloadDataTrigger.userNavbarInfoReloadTrigger.subscribe(() => {
        this.user = this.userService.getUser();
      });
  }

  isActive(url: string) {
    const matchOptions: IsActiveMatchOptions = {
      paths: 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    };
    return this.router.isActive(url, matchOptions);
  }
}
