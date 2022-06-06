import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { ProfileComponent } from './profile/profile.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
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
    AuthModule.forRoot({
      domain: 'a4rb.auth0.com',
      clientId: '97DKUoDtcp1tB48C2Rx8DNjVPXgjtXJ6',
      serverUrl: 'http://localhost:3000',
      audience: 'https://codeapi.demo.com',
      httpInterceptor: {
        allowedList: ['http://localhost:3000/code/*'],
      },
    }),
    HttpClientModule,
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
