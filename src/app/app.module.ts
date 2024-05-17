import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
