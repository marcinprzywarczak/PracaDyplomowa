import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {HttpXsrfInterceptor} from "./shared/HttpXsrfInterceptor";
import {DashboardModule} from "./pages/dashboard/dashboard.module";
import {LoginModule} from "./pages/login/login.module";
import {AuthInterceptor} from "./shared/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
      HttpClientModule,
      DashboardModule,
      LoginModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
