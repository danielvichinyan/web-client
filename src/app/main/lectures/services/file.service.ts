import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FileResponse } from "../payload/file.response";

@Injectable({providedIn: 'root'})
export class FileService {

    constructor(
        private http: HttpClient
    ) {
    }

    public uploadFile(formData: FormData): Observable<FileResponse> {
        return this.http.post<FileResponse>(environment.fileApiUrl + '/upload-file', formData, {
            reportProgress: true,
            headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        });
    }

    public downloadFile(filename: string): Observable<Blob> {
        return this.http.get(environment.fileApiUrl + `/download/${filename}`, {
            reportProgress: true,
            responseType: 'blob'
        });
    }
}