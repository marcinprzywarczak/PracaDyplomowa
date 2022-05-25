import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeSellComponent } from './office-sell.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    OfficeSellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: OfficeSellComponent}]),
    SharedModule,
    PaginatorModule,
    ProgressSpinnerModule,
  ]
})
export class OfficeSellModule { }
