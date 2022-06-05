import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  tokenClaims: string = '';
  token: string = '';
  badToken: string = '';

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.idTokenClaims$.subscribe((claims) => {
      this.tokenClaims = JSON.stringify(claims, null, 2);
      this.getRawToken();
    });

    this.auth.getAccessTokenSilently().subscribe(
      (token) => (this.badToken = token),
    );
  }

  getRawToken() {
    this.token = this.tokenClaims.split('"__raw":')[1].split('"')[1];
  }
}
