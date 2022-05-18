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
import {RegisterModule} from "./pages/register/register.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { OfferComponent } from './components/offer/offer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        OfferComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        // DashboardModule,
        LoginModule,
        RegisterModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    exports: [
        OfferComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
