import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelComponent } from './user-panel.component';
import { RouterModule } from '@angular/router';
import { UserPanelNavbarComponent } from './components/user-panel-navbar/user-panel-navbar.component';
import { UserPanelOffersComponent } from './components/user-panel-offers/user-panel-offers.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/shared.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserPanelFollowingOffersComponent } from './components/user-panel-following-offers/user-panel-following-offers.component';
import { UserPanelFirmUsersComponent } from './components/user-panel-firm-users/user-panel-firm-users.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginGuard } from '../../shared/guards/login/login.guard';
import { AuthGuard } from '../../shared/guards/auth/auth.guard';
import { UserPanelMessagesComponent } from './components/user-panel-messages/user-panel-messages.component';
import { BadgeModule } from 'primeng/badge';
import { InputMaskModule } from 'primeng/inputmask';
import { UserPanelSettingsComponent } from './components/user-panel-settings/user-panel-settings.component';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    UserPanelComponent,
    UserPanelNavbarComponent,
    UserPanelOffersComponent,
    UserPanelFollowingOffersComponent,
    UserPanelFirmUsersComponent,
    UserPanelMessagesComponent,
    UserPanelSettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserPanelComponent,
        children: [
          {
            path: 'ogloszenia',
            component: UserPanelOffersComponent,
          },
          {
            path: 'ogloszenia-obserwowane',
            component: UserPanelFollowingOffersComponent,
          },
          {
            path: 'pracownicy',
            component: UserPanelFirmUsersComponent,
          },
          {
            path: 'wiadomosci',
            component: UserPanelMessagesComponent,
          },
          {
            path: 'ustawienia',
            component: UserPanelSettingsComponent,
          },
        ],
        canActivate: [AuthGuard],
      },
    ]),
    ButtonModule,
    SharedModule,
    SelectButtonModule,
    FormsModule,
    PaginatorModule,
    ProgressSpinnerModule,
    TableModule,
    InputTextModule,
    SidebarModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    BadgeModule,
    InputMaskModule,
    RippleModule,
    TooltipModule,
    AvatarModule,
    SkeletonModule,
  ],
})
export class UserPanelModule {}
