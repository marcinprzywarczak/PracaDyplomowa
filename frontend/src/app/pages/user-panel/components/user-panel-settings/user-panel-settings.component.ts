import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../../shared/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HideSidebarTriggerService } from '../../../../shared/services/hide-sidebar-trigger/hide-sidebar-trigger.service';
import { ReloadDataTriggerService } from '../../../../shared/services/reload-data-trigger/reload-data-trigger.service';

@Component({
  selector: 'app-user-panel-settings',
  templateUrl: './user-panel-settings.component.html',
  styleUrls: ['./user-panel-settings.component.scss'],
})
export class UserPanelSettingsComponent implements OnInit, OnDestroy {
  user: User;
  displaySidebar: boolean = false;
  hideSidebarTriggerSubscription: Subscription;
  editingUser: boolean;
  editingFirm: boolean;
  changingPassword: boolean;
  reloadUserInfoSubscription: Subscription;
  dataLoaded: boolean = false;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private hideSidebarTrigger: HideSidebarTriggerService,
    private reloadDataTrigger: ReloadDataTriggerService
  ) {}

  ngOnInit(): void {
    this.listenOnHideSidebarTrigger();
    this.listenOnUserInfoReloadTrigger();
    this.setUser();
  }

  ngOnDestroy() {
    this.hideSidebarTriggerSubscription.unsubscribe();
    this.reloadUserInfoSubscription.unsubscribe();
  }

  editUser() {
    this.displaySidebar = true;
    this.editingUser = true;
    this.editingFirm = false;
    this.changingPassword = false;
  }

  editFirm() {
    this.displaySidebar = true;
    this.editingFirm = true;
    this.editingUser = false;
    this.changingPassword = false;
  }

  changePassword() {
    this.displaySidebar = true;
    this.changingPassword = true;
    this.editingUser = false;
    this.editingFirm = false;
  }

  private listenOnHideSidebarTrigger() {
    this.hideSidebarTriggerSubscription =
      this.hideSidebarTrigger.addFirmUserSidebarHide.subscribe(() => {
        this.displaySidebar = false;
      });
  }

  private listenOnUserInfoReloadTrigger() {
    this.reloadUserInfoSubscription =
      this.reloadDataTrigger.userInfoReloadTrigger.subscribe(() => {
        this.dataLoaded = false;
        this.setUser();
      });
  }

  setUser() {
    this.http
      .get<any>('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe({
        next: (result) => {
          console.log(result);
          this.user = result.user;
          this.dataLoaded = true;
          this.userService.setUser(this.user);
          this.reloadDataTrigger.triggerUserNavbarInfoReload();
        },
        error: (err) => {},
      });
  }
}
