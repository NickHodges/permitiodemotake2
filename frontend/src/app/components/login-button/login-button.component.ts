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
    this.auth.loginWithPopup();
    this.auth.getAccessTokenSilently().subscribe((token) => {
      localStorage.setItem('token', token);
    });
  }

  doLogout(): void {
    this.auth.logout({ returnTo: document.location.origin });
  }
}
