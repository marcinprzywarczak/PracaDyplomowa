import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeRentComponent } from './office-rent.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    OfficeRentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: OfficeRentComponent}]),
    SharedModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ]
})
export class OfficeRentModule { }
