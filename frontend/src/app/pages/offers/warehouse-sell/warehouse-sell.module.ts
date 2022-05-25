import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseSellComponent } from './warehouse-sell.component';
import {RouterModule} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "../../../shared/shared.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    WarehouseSellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: WarehouseSellComponent}]),
    PaginatorModule,
    SharedModule,
    ProgressSpinnerModule,
  ]
})
export class WarehouseSellModule { }
