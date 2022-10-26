import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatComponent } from './flat.component';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '../../../shared/shared.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [FlatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FlatComponent }]),
    PaginatorModule,
    SharedModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    ReactiveFormsModule,
    InputTextModule,
    SidebarModule,
    ButtonModule,
  ],
})
export class FlatModule {}
