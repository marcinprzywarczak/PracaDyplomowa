import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRentComponent } from './room-rent.component';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [RoomRentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RoomRentComponent }]),
    ProgressSpinnerModule,
    PaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    SidebarModule,
    ButtonModule,
  ],
})
export class RoomRentModule {}
