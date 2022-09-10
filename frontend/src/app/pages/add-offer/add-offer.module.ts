import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOfferComponent } from './add-offer.component';
import { RouterModule } from '@angular/router';
import { AddHouseOfferComponent } from './components/add-house-offer/add-house-offer.component';

@NgModule({
  declarations: [AddOfferComponent, AddHouseOfferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddOfferComponent },
      {
        path: 'dom/sprzedaz',
        component: AddHouseOfferComponent,
      },
      {
        path: 'dom/wynajem',
        component: AddHouseOfferComponent,
      },
    ]),
  ],
})
export class AddOfferModule {}
