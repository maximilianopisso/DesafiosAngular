import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model'
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [];
  private token: any = null;
  private user = '';
  private userName = '';
  private role ='';
  url = environment.urlLocalLogin


  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {

  }

  validateLogin(email: string, password: string): boolean {           //metodo para validar el login pasando el email y password como argumentos
    var respuesta: boolean = false;
    this.users.forEach(usuario => {
      if (usuario.email === email && usuario.password === password) {
        respuesta = true;
      }
    });
    return respuesta;
  }


  validateCredentials(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>(`${this.url}/validate`, {email,password})
      .pipe(
        map(response => {
          if (response.status === 'OK') {
            this.token = response.token;
            const decodedToken: any = jwt_decode(this.token);
            this.user = decodedToken?.user;
            this.userName = decodedToken?.userName;
            this.role = decodedToken?.role;
            return true;
          } else {
            this.token = null;
            return false;
          }
        })
      )
  }

  getToken(): any {
    return this.token;
  }

  isUserLoggedIn():boolean {
    return this.user !== '';
  }

  getUserInfo(): any {
    return {
      user: this.user,
      userName: this.userName,
      role: this.role,
      token: this.token
    }
  }
}


