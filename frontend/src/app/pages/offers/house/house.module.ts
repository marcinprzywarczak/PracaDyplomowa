import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './house.component';
import { RouterModule } from '@angular/router';
import { AppModule } from '../../../app.module';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HouseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HouseComponent }]),
    SharedModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    MultiSelectModule,
    SidebarModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class HouseModule {}
