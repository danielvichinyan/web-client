import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient) {
    }
    
      public isAuthenticated(): boolean {
          const token = localStorage.getItem('token');
          // If token is expired
          
          return !this.jwtHelper.isTokenExpired(token!);
      }
}