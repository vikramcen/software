
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        public router: Router) { }

   

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let loadingExists  :any;
        const routeURL = request.headers.get('routeURL');
        const token: string = localStorage.getItem('token');
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            if (request.url == "/") {
                this.router.navigate(['Home']);
                return EMPTY;
            }
        }
        else {
            if (request.url.substr(-10) == "User/Login" || request.url.substr(-23) == "User/forgetUserPassword") {
                console.log('Either Login or Forgot Password request')
            }
            else {
                localStorage.removeItem('token');  
                localStorage.removeItem('userData'); 
                this.router.navigate(['']);
                return EMPTY;
            }
        }


        return (
            next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (!request.body || (request.body && !request.body.isLoderHide && loadingExists)) {
                        }
                        let token_tk = event.headers.get('token_tk');
                        if(token_tk){
                            localStorage.setItem('token', token_tk);
                        }                        
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    
                    if (!request.body || (request.body && !request.body.isLoderHide && loadingExists)) {
                    }

                    
                    if(error.status == 401){                        
                        localStorage.removeItem('token');  
                        localStorage.removeItem('userData');                        
                        
                        this.router.navigate(['']);
                        return EMPTY;
                    }
                    if(error.status == 403){
                    }
                    return throwError(error);
                }))
        )
    }
}
