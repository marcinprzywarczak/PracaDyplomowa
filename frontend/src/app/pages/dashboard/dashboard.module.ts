import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {AppRoutingModule} from "../../app-routing.module";
import {AppModule} from "../../app.module";
import {PaginatorModule} from "primeng/paginator";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppModule,
    PaginatorModule
  ]
})
export class DashboardModule { }
