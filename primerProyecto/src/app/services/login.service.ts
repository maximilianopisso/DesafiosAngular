import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model'
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';
import { userDisplay } from '../features/login-redux/user..model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [];
  private token: any = null;
  private email = '';
  private nombre = '';
  private apellido = '';
  private role ='';
  url = environment.urlLocalLogin


  constructor(
   // private userService: UserService,
    private httpClient: HttpClient
  ) {

  }
//METODO QUE VALIDA A LOS USARIOS QUE SE LOGEAN PASANDO EMAIL Y PASSWORD CONTRA LA API DE USUARIOS.
  validateCredentials(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>(`${this.url}/validate`, {email,password})
      .pipe(
        map(response => {
          if (response.status === 'OK') {
              this.token = response.token;
              const decodedToken: any = jwt_decode(this.token);
              this.email = decodedToken?.email;
              this.nombre = decodedToken?.nombre;
              this.role = decodedToken?.role;
              this.apellido = decodedToken?.apellido;
            return true;
          } else {
              this.token = null;
            return false;
          }
        })
      )
  }
// METODO QUE DEVUELVE EL TOKEN DEL USUARIO -> INTERCEPTOR
  getToken(): any {
    return this.token;
  }
//  METODO QUE DEVUELVE SI HAY UN USUARIO LOGEADO -> GUARDS
  isUserLoggedIn():boolean {
    return this.email !== '';
  }
 //  METODO QUE DEVUELVE LA INFORMACION DEL USUARIO LOGEADO -> GUARDS ADMIN
  getUserInfo(): userDisplay {
    let user:userDisplay ={
      email: this.email,
      apellido: this.apellido,
      nombre: this.nombre,
      role: this.role,
      token: this.token
    }

    return user;
  }
  getUserName(): string {
    return this.nombre
    }
}


