import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotRentComponent } from './plot-rent.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    PlotRentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PlotRentComponent}]),
    SharedModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ]
})
export class PlotRentModule { }
