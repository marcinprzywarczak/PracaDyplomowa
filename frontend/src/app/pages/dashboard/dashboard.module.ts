import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {AppRoutingModule} from "../../app-routing.module";
import {AppModule} from "../../app.module";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressSpinnerModule
  ]
})
export class DashboardModule { }
