import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: [],
})
export class LoginButtonComponent implements OnInit {
  theToken: string = '';

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {}

  doLogin(): void {
    console.log('Doing login');
    this.auth.loginWithRedirect().subscribe(() => {
      console.log('Authenticated!!!');
      const claimsInfo = this.auth.getIdTokenClaims().subscribe((claims) => {
        if (claims) {
          console.log('Claims: ', claims);
          const rawToken = claims.__raw; // (long token)
          localStorage.setItem('token', rawToken);
        }
      });
    });
  }

  doLogout(): void {
    localStorage.removeItem('token');
    this.auth.logout({ returnTo: document.location.origin });
  }
}
