import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseRentComponent } from './warehouse-rent.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    WarehouseRentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: WarehouseRentComponent}]),
    SharedModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ]
})
export class WarehouseRentModule { }
