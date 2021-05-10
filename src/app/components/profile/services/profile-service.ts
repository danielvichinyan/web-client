import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfileResponse } from "../payload/profile.response";

@Injectable({providedIn: 'root'})
export class ProfileService {

    constructor(
        private http: HttpClient
    ) {
    }

    viewProfile(): Observable<ProfileResponse> {
        return this.http.get<ProfileResponse>(environment.profileApiUrl + '/me');
    }
}