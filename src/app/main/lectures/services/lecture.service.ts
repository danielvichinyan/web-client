import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FileResponse } from "../payload/file.response";
import { LectureRequest } from "../payload/lecture.request";
import { LectureResponse } from "../payload/lecture.response";

@Injectable({providedIn: 'root'})
export class LectureService {

    constructor(
        private http: HttpClient
    ) {
    }

    public addLecture(lecture: LectureRequest): Observable<LectureResponse> {
        return this.http.post<LectureResponse>(environment.lecturesApiUrl + '/lecture', lecture);
    }

    public getAllLectures(): Observable<LectureResponse[]> {
       return this.http.get<LectureResponse[]>(environment.lecturesApiUrl + '/lecture');
    }
}