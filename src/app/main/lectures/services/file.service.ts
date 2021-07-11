import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FileService {

    constructor(
        private http: HttpClient
    ) {
    }

    public uploadFile(formData: FormData): Observable<HttpEvent<string[]>> {
        return this.http.post<string[]>(`http://localhost:8084/file/upload`, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    public downloadFile(filename: string): Observable<HttpEvent<Blob>> {
        return this.http.get(`http://localhost:8084/file/download/${filename}`, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        });
    }
}