import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { QuizRequest } from "../payload/quiz.request";
import { QuizResponse } from "../payload/quiz.response";

@Injectable({providedIn: 'root'})
export class QuizService {

    constructor(
        private http: HttpClient
    ) {
    }

    public addQuiz(quiz: QuizRequest): Observable<QuizResponse> {
        return this.http.post<QuizResponse>(environment.lecturesApiUrl + '/quiz', quiz);
    }

    public getAllQuizzes(): Observable<QuizResponse[]> {
       return this.http.get<QuizResponse[]>(environment.lecturesApiUrl + '/quiz');
    }

    public getViewQuiz(name: string): Observable<QuizResponse> {
        return this.http.get<QuizResponse>(environment.lecturesApiUrl + `/quiz/${name}`);
    }
}