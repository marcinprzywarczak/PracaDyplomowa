import { Component, OnInit } from '@angular/core';
import { FirmUserService } from '../../../../shared/services/firm-user-service/firm-user.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-user-panel-firm-users',
  templateUrl: './user-panel-firm-users.component.html',
  styleUrls: ['./user-panel-firm-users.component.scss'],
})
export class UserPanelFirmUsersComponent implements OnInit {
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
  constructor(private firmUserService: FirmUserService) {}

  ngOnInit(): void {
    // this.firmUserService.getFirmUsers().subscribe((result) => {
    //   console.log(result);
    //   this.users = result.users;
    // });
  }

  loadUsers(event: LazyLoadEvent) {
    console.log(event);
    this.loading = true;
    this.firmUserService.getFirmUsers(event).subscribe((result) => {
      console.log(result);
      this.users = result.users;
      this.totalRecords = result.totalRecords;
      this.loading = false;
    });
  }
}
