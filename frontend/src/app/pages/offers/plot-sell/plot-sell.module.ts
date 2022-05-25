import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotSellComponent } from './plot-sell.component';
import {RouterModule} from "@angular/router";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    PlotSellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PlotSellComponent}]),
    ProgressSpinnerModule,
    PaginatorModule,
    SharedModule,
  ]
})
export class PlotSellModule { }
