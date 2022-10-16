import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirmUserService } from '../../../../shared/services/firm-user-service/firm-user.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ReloadDataTriggerService } from '../../../../shared/services/reload-data-trigger/reload-data-trigger.service';
import { Subscription } from 'rxjs';
import { HideSidebarTriggerService } from '../../../../shared/services/hide-sidebar-trigger/hide-sidebar-trigger.service';
import { User } from '../../../../shared/models/user';
import { AlertService } from '../../../../shared/services/alert-service/alert.service';

@Component({
  selector: 'app-user-panel-firm-users',
  templateUrl: './user-panel-firm-users.component.html',
  styleUrls: ['./user-panel-firm-users.component.scss'],
})
export class UserPanelFirmUsersComponent implements OnInit, OnDestroy {
  columns: { displayName: string; databaseName: string }[] = [
    { displayName: 'id', databaseName: 'id' },
    { displayName: 'Imię', databaseName: 'first_name' },
    { displayName: 'Nazwisko', databaseName: 'sure_name' },
    { displayName: 'Adres-email', databaseName: 'email' },
    { displayName: 'Numer telefonu', databaseName: 'phone_number' },
  ];
  users: any[] = [];
  loading: boolean = true;
  totalRecords: number;
  displaySidebar: boolean = false;
  triggerSubscription: Subscription;
  hideSidebarTriggerSubscription: Subscription;
  lazyLoadEvent: LazyLoadEvent;
  isEditUser: boolean = false;
  currentUser: User;
  constructor(
    private firmUserService: FirmUserService,
    private reloadDataTrigger: ReloadDataTriggerService,
    private hideSidebarTrigger: HideSidebarTriggerService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.listenOnTrigger();
    this.listenOnHideSidebarTrigger();
  }

  ngOnDestroy() {
    this.triggerSubscription.unsubscribe();
    this.hideSidebarTriggerSubscription.unsubscribe();
  }

  private listenOnTrigger(): void {
    this.triggerSubscription =
      this.reloadDataTrigger.firmUsersReloadTrigger.subscribe(() => {
        this.loading = true;
        this.loadUsers(this.lazyLoadEvent);
      });
  }

  private listenOnHideSidebarTrigger() {
    this.hideSidebarTriggerSubscription =
      this.hideSidebarTrigger.addFirmUserSidebarHide.subscribe(() => {
        this.displaySidebar = false;
      });
  }

  loadUsers(event: LazyLoadEvent) {
    this.lazyLoadEvent = event;
    console.log(event);
    this.loading = true;
    this.firmUserService.getFirmUsers(event).subscribe({
      next: (result) => {
        console.log(result);
        this.users = result.users;
        this.totalRecords = result.totalRecords;
        this.loading = false;
      },
      error: (err) => {},
    });
  }

  editUser(user: User) {
    this.isEditUser = true;
    this.currentUser = user;
    this.displaySidebar = true;
  }

  addNewUser() {
    this.displaySidebar = true;
    this.isEditUser = false;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz usunąć tego użytkownika?',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.loading = true;
        this.firmUserService.deleteFirmUser(user.id).subscribe({
          next: (value) => {
            this.alertService.showSuccess('Użytkownik usunięty pomyślnie!');
            this.loadUsers(this.lazyLoadEvent);
          },
          error: (err) => {
            this.alertService.showError('Błąd podczas usuwania użytkownika!');
            this.loading = false;
          },
        });
      },
    });
  }
}
