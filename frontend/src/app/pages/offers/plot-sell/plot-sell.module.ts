import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotSellComponent } from './plot-sell.component';
import {RouterModule} from "@angular/router";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";



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
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    SidebarModule,
  ]
})
export class PlotSellModule { }
