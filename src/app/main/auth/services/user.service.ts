import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginRequest } from "../payload/login.request";
import { RegisterRequest } from "../payload/register.request";
import { RegisterResponse } from "../payload/register.response";

@Injectable({providedIn: 'root'})
export class UserService {

    public isLoggedIn: boolean = false;

    constructor(
        private http: HttpClient
    ) {
    }

    login(loginRequest: LoginRequest): Observable<any> {
        return this.http.post<any>(
            environment.authApiUrl + '/token',
            loginRequest,
            { observe: 'response' }
        )
        .pipe(
            map(response => {
                
            if (response) {
                localStorage.setItem('token', response.headers.get('Authorization')!.replace('Bearer ', '').trim());
            }

            return loginRequest;
        }));
    }

    register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(environment.authApiUrl + '/users', registerRequest);
    }
}
