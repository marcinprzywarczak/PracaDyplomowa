import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseRentComponent } from './house-rent.component';
import {SharedModule} from "../../../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HouseRentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HouseRentComponent}]),
    SharedModule,
    PaginatorModule,
    ProgressSpinnerModule
  ]
})
export class HouseRentModule { }
