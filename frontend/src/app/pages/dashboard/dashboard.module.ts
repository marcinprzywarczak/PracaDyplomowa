import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from '../../app-routing.module';
import { AppModule } from '../../app.module';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from '../../shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    SidebarModule,
    CheckboxModule,
    ButtonModule,
  ],
})
export class DashboardModule {}
