import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelComponent } from './user-panel.component';
import { RouterModule } from '@angular/router';
import { UserPanelNavbarComponent } from './components/user-panel-navbar/user-panel-navbar.component';
import { UserPanelOffersComponent } from './components/user-panel-offers/user-panel-offers.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/shared.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserPanelFollowingOffersComponent } from './components/user-panel-following-offers/user-panel-following-offers.component';

@NgModule({
  declarations: [
    UserPanelComponent,
    UserPanelNavbarComponent,
    UserPanelOffersComponent,
    UserPanelFollowingOffersComponent,
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
        ],
      },
    ]),
    ButtonModule,
    SharedModule,
    SelectButtonModule,
    FormsModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ],
})
export class UserPanelModule {}
