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
    path: 'dom/sprzedaz',
    loadChildren: () => import('./pages/offers/house-sell/house-sell.module').then(m => m.HouseSellModule),
  },
  {
    path: 'dom/wynajem',
    loadChildren: () => import('./pages/offers/house-rent/house-rent.module').then(m => m.HouseRentModule),
  },
  {
    path: 'mieszkanie/sprzedaz',
    loadChildren: () => import('./pages/offers/flat-sell/flat-sell.module').then(m => m.FlatSellModule),
  },
  {
    path: 'mieszkanie/wynajem',
    loadChildren: () => import('./pages/offers/flat-rent/flat-rent.module').then(m => m.FlatRentModule),
  },
  {
    path: 'biuro/sprzedaz',
    loadChildren: () => import('./pages/offers/office-sell/office-sell.module').then(m => m.OfficeSellModule),
  },

  {
    path: 'biuro/wynajem',
    loadChildren: () => import('./pages/offers/office-rent/office-rent.module').then(m => m.OfficeRentModule),
  },

  {
    path: 'dzialka/sprzedaz',
    loadChildren: () => import('./pages/offers/plot-sell/plot-sell.module').then(m => m.PlotSellModule),
  },

  {
    path: 'dzialka/wynajem',
    loadChildren: () => import('./pages/offers/plot-rent/plot-rent.module').then(m => m.PlotRentModule),
  },
  {
    path: 'pokoj/wynajem',
    loadChildren: () => import('./pages/offers/room-rent/room-rent.module').then(m => m.RoomRentModule),
  },

  {
    path: 'magazyn/sprzedaz',
    loadChildren: () => import('./pages/offers/warehouse-sell/warehouse-sell.module').then(m => m.WarehouseSellModule),
  },
  {
    path: 'magazyn/wynajem',
    loadChildren: () => import('./pages/offers/warehouse-rent/warehouse-rent.module').then(m => m.WarehouseRentModule),
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
