import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferDetailsComponent } from './offer-details.component';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [OfferDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OfferDetailsComponent }]),
    GalleriaModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
})
export class OfferDetailsModule {}
