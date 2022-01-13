import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    //private router : Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.loginService.getToken()
    const apiLocal = request.url.startsWith(environment.urlLocalCart)

    console.log("TOKEN",token);
    console.log("APILOCAL",apiLocal);

    if(token && apiLocal){
      console.log("ENTRA A COLOCAR HEADER");

        request = request.clone ({
            setHeaders: {Authorization: `Bearer ${token}`}
        });
    }

    console.log("REQUEST",request)

    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          console.log("Error 401");
          //this.router.navigateByUrl('/login');
        }

        return throwError(()=>err);

      })
    );
}

}

