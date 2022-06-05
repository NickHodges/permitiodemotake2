import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { ProfileComponent } from './profile/profile.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { CallCodeComponent } from './callcode/callcode.component';
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../token-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    ProfileComponent,
    CallCodeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'a4rb.auth0.com',
      clientId: '97DKUoDtcp1tB48C2Rx8DNjVPXgjtXJ6',
      serverUrl: 'http://localhost:3000',
      httpInterceptor: {
        allowedList: ['http://localhost:3000/code/*'],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
