import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { HttpXsrfInterceptor } from './shared/interceptors/xsrf-interceptor/HttpXsrfInterceptor';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginModule } from './pages/login/login.module';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor/auth.interceptor';
import { RegisterModule } from './pages/register/register.module';
import { OfferComponent } from './shared/components/offer/offer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NotFoundInterceptor } from './shared/interceptors/not-found-interceptor/not-found.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
registerLocaleData(localePl);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // DashboardModule,
    LoginModule,
    RegisterModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ToastModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotFoundInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'pl', // 'de-DE' for Germany, 'fr-FR' for France ...
    },
    MessageService,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
