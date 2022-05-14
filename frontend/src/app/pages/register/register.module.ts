import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {PaginatorModule} from "primeng/paginator";



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputSwitchModule,
    PaginatorModule
  ]
})
export class RegisterModule { }
