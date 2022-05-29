import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatSellComponent } from './flat-sell.component';
import {RouterModule} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {SharedModule} from "../../../shared/shared.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MultiSelectModule} from "primeng/multiselect";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";



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
        MultiSelectModule,
        ReactiveFormsModule,
        InputTextModule,
        SidebarModule,
    ]
})
export class FlatSellModule { }
