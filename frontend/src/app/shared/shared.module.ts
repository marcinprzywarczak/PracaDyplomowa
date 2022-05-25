import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OfferComponent} from "./components/offer/offer.component";



@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OfferComponent
  ],
})
export class SharedModule { }
