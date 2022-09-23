import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOfferComponent } from './add-offer.component';
import { RouterModule } from '@angular/router';
import { AddOfferFormComponent } from './components/add-offer-form/add-offer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { AfterAddOfferComponent } from './components/after-add-offer/after-add-offer.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AddOfferComponent,
    AddOfferFormComponent,
    AfterAddOfferComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddOfferComponent },
      {
        path: 'dom/sprzedaz',
        component: AddOfferFormComponent,
      },
      {
        path: 'dom/wynajem',
        component: AddOfferFormComponent,
      },
      {
        path: 'mieszkanie/sprzedaz',
        component: AddOfferFormComponent,
      },
      {
        path: 'mieszkanie/wynajem',
        component: AddOfferFormComponent,
      },
      {
        path: 'dzialka/sprzedaz',
        component: AddOfferFormComponent,
      },
      {
        path: 'dzialka/wynajem',
        component: AddOfferFormComponent,
      },
      {
        path: 'pokoj/wynajem',
        component: AddOfferFormComponent,
      },
      {
        path: 'oferta-dodana',
        component: AfterAddOfferComponent,
      },
    ]),
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    ProgressSpinnerModule,
    CheckboxModule,
    RippleModule,
    TooltipModule,
  ],
})
export class AddOfferModule {}
