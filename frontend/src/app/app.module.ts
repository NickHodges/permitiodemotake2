import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { ProfileComponent } from './profile/profile.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { CallCodeComponent } from './callcode/callcode.component';
import { environment as env } from '../environments/environment';
// import { TokenInterceptor } from '../token-interceptor.interceptor';

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
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://a4rb.auth0.com/api/v2/' (note the asterisk)
            uri: 'http://localhost:3000/*',
            tokenOptions: {
              // The attached token should target this audience
              //audience: 'https://a4rb.auth0.com',
              audience: 'https://codeapi.demo.com',
              // // The attached token should have these scopes
              // scope: 'read:current_user',
            },
          },
        ],
      },
    }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
