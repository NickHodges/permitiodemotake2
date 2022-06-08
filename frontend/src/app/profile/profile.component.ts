import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, pluck, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  tokenClaims: string = '';
  token: string = '';
  metadata = {};

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.idTokenClaims$.subscribe((claims) => {
      this.tokenClaims = JSON.stringify(claims, null, 2);
      this.getRawToken();
    });
  }

  getRawToken() {
    this.token = this.tokenClaims.split('"__raw":')[1].split('"')[1];
  }
}
