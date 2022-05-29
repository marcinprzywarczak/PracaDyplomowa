import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from './plot.component';
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
    PlotComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PlotComponent}]),
    ProgressSpinnerModule,
    PaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    SidebarModule,
  ]
})
export class PlotModule { }
