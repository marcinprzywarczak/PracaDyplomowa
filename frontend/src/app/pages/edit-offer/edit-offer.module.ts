import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOfferComponent } from './edit-offer.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditOfferComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EditOfferComponent,
      },
    ]),
    CommonModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    TooltipModule,
    InputTextareaModule,
    InputTextModule,
  ],
})
export class EditOfferModule {}
