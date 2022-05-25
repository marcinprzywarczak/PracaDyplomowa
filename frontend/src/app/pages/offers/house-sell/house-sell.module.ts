import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseSellComponent } from './house-sell.component';
import {RouterModule} from "@angular/router";
import {AppModule} from "../../../app.module";
import {PaginatorModule} from "primeng/paginator";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    HouseSellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HouseSellComponent}]),
    SharedModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ]
})
export class HouseSellModule { }
