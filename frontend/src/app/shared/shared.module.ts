import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfferComponent} from "./components/offer/offer.component";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    OfferComponent
  ],
})
export class SharedModule { }
