import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRentComponent } from './room-rent.component';
import {RouterModule} from "@angular/router";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    RoomRentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: RoomRentComponent}]),
    ProgressSpinnerModule,
    PaginatorModule,
    SharedModule,
  ]
})
export class RoomRentModule { }
