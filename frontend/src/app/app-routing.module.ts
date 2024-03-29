import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginGuard } from './shared/guards/login/login.guard';
import { RegisterComponent } from './pages/register/register.component';
import { HouseComponent } from './pages/offers/house/house.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'offer/:id',
    loadChildren: () =>
      import('./pages/offer-details/offer-details.module').then(
        (m) => m.OfferDetailsModule
      ),
  },
  {
    path: 'dom/:type',
    loadChildren: () =>
      import('./pages/offers/house/house.module').then((m) => m.HouseModule),
  },
  {
    path: 'mieszkanie/:type',
    loadChildren: () =>
      import('./pages/offers/flat/flat.module').then((m) => m.FlatModule),
  },
  {
    path: 'dzialka/:type',
    loadChildren: () =>
      import('./pages/offers/plot/plot.module').then((m) => m.PlotModule),
  },
  {
    path: 'pokoj/wynajem',
    loadChildren: () =>
      import('./pages/offers/room-rent/room-rent.module').then(
        (m) => m.RoomRentModule
      ),
  },
  {
    path: 'dodaj-ogloszenie',
    loadChildren: () =>
      import('./pages/add-offer/add-offer.module').then(
        (m) => m.AddOfferModule
      ),
  },
  {
    path: 'uzytkownik',
    loadChildren: () =>
      import('./pages/user-panel/user-panel.module').then(
        (m) => m.UserPanelModule
      ),
  },
  {
    path: 'ogloszenie/:offerId/edytuj',
    loadChildren: () =>
      import('./pages/edit-offer/edit-offer.module').then(
        (m) => m.EditOfferModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'nie-znaleziono',
    loadChildren: () =>
      import('./pages/not-found-page/not-found-page.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
  {
    path: 'brak-dostepu',
    loadChildren: () =>
      import('./pages/forbidden-page/forbidden-page.module').then(
        (m) => m.ForbiddenPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'nie-znaleziono',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
