import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputSwitchModule,
    PaginatorModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    InputMaskModule,
  ],
})
export class RegisterModule {}
