import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProfileRequest } from "../payload/profile.request";
import { ProfileResponse } from "../payload/profile.response";

@Injectable({providedIn: 'root'})
export class ProfileService {

    constructor(
        private http: HttpClient
    ) {
    }

    public viewProfile(): Observable<ProfileResponse> {
        return this.http.get<ProfileResponse>(environment.profileApiUrl + '/me');
    }

    public editProfile(editProfileRequest: ProfileRequest): Observable<ProfileResponse> {
        return this.http.put<ProfileResponse>(environment.profileApiUrl + '/me', editProfileRequest);
    }

    public getUserProfiles(): Observable<ProfileResponse[]> {
        return this.http.get<ProfileResponse[]>(environment.profileApiUrl + '/users');
    }
}