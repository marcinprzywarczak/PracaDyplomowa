import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferDetailsComponent } from './offer-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OfferDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OfferDetailsComponent }]),
  ],
})
export class OfferDetailsModule {}
