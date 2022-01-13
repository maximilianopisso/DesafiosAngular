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
  private email = '';
  private nombre = '';
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
            this.email = decodedToken?.mail;
            this.nombre = decodedToken?.nombre;
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
    return this.email !== '';
  }

  getUserInfo(): any {
    return {
      user: this.email,
      userName: this.nombre,
      role: this.role,
      token: this.token
    }
  }
}


