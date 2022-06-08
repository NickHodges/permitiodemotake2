import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'call-code-api',
  templateUrl: './callcode.component.html',
})
export class CallCodeComponent implements OnInit {
  message: string = '';
  private rootURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private readonly auth: AuthService) {
    this.auth.error$.subscribe((error) => {
      console.log('Error: ', error);
    });
  }

  ngOnInit(): void {}

  readCode() {
    this.http
      .get(`${this.rootURL}/code/read`, { responseType: 'text' })
      .subscribe(() => {
        this.message = 'Authorized to read code';
      });
  }

  writeCode() {
    this.http
      .get(`${this.rootURL}/code/write`, { responseType: 'text' })
      .subscribe(() => {
        this.message = 'Authorized to write code';
      });
  }

  reviewCode() {
    this.http
      .get(`${this.rootURL}/code/review`, { responseType: 'text' })
      .subscribe(() => {
        this.message = 'Authorized to review code';
      });
  }

  commitCode() {
    this.http
      .get(`${this.rootURL}/code/commit`, { responseType: 'text' })
      .subscribe(() => {
        this.message = 'Authorized to commit code';
      });
  }

  promoteMarvin() {
    this.http
      .get(`${this.rootURL}/personnel/promote`, { responseType: 'text' })
      .subscribe(() => {
        this.message = 'Marvin has been promoted!';
      });
  }

  demoteMarvin() {
    this.http
      .get(`${this.rootURL}/personnel/demote`, { responseType: 'text' })
      .subscribe(() => {
        this.message = 'Marvin has been demoted!';
      });
  }

  sayHello() {
    this.http
      .get(`${this.rootURL}/hello`, { responseType: 'text' })
      .subscribe(() => {
        this.message = 'Hello was said!';
      });
  }
}
