import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginGuard} from "./shared/guards/login/login.guard";
import {RegisterComponent} from "./pages/register/register.component";
import {HouseSellComponent} from "./pages/offers/house-sell/house-sell.component";

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent, canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent, canActivate: [LoginGuard]
  },
  {
    path: 'offer/:id',
    loadChildren: () => import('./pages/offer-details/offer-details.module').then(m => m.OfferDetailsModule),
  },
  {
    path: 'dom/:type',
    loadChildren: () => import('./pages/offers/house-sell/house-sell.module').then(m => m.HouseSellModule),
  },
  {
    path: 'mieszkanie/:type',
    loadChildren: () => import('./pages/offers/flat-sell/flat-sell.module').then(m => m.FlatSellModule),
  },
  {
    path: 'dzialka/:type',
    loadChildren: () => import('./pages/offers/plot-sell/plot-sell.module').then(m => m.PlotSellModule),
  },
  {
    path: 'pokoj/wynajem',
    loadChildren: () => import('./pages/offers/room-rent/room-rent.module').then(m => m.RoomRentModule),
  },

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: '**',
    component: DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
