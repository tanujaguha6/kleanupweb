import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public login: LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(localStorage.getItem('id_token')){
        request = request.clone({
        setHeaders: {
            'x-access-token': localStorage.getItem('id_token')
        }
        });
    }
    return next.handle(request);
  }
}