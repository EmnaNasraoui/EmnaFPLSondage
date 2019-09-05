import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ConnectedToken: any;
  constructor(private http: HttpClient, private CookiesService: CookieService) {
    this.ConnectedToken = this.ConnectedUser();

  }

  registre(user) {
    return this.http.post('http://localhost:3000/auth/register', user);
  }
  login(user) {
    return this.http.post('http://localhost:3000/auth/login', user);
  }
  setToken(token) {
    this.CookiesService.set('token', token, 999999, '/');
  }
  ConnectedUser() {
    if (this.CookiesService.get('token')) {
      return jwt_decode(this.CookiesService.get('token')).id;
    } else {
      return null;
    }
  }
}
