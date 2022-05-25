import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatSellComponent } from './flat-sell.component';
import {RouterModule} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "../../../shared/shared.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    FlatSellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: FlatSellComponent}]),
    PaginatorModule,
    SharedModule,
    ProgressSpinnerModule,
  ]
})
export class FlatSellModule { }
