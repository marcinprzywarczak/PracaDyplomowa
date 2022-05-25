import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatRentComponent } from './flat-rent.component';
import {RouterModule} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "../../../shared/shared.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    FlatRentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: FlatRentComponent}]),
    PaginatorModule,
    SharedModule,
    ProgressSpinnerModule,
  ]
})
export class FlatRentModule { }
