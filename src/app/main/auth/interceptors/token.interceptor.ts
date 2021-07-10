import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (!token) {
            return next.handle(req);
        }
        
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + token
        });
        
        const requestCopy = req.clone({headers});

        return next.handle(requestCopy);
    }
}