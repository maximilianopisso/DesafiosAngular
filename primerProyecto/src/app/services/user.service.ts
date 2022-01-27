import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   private urlLocalUserApi = environment.urlLocalLogin;
  private users: User[] = [];
  constructor(private httpClient : HttpClient) {}

  //METODO PARA OBTENER DESDE LA API DE USUARIO, EL LISTADO DE USUARIOS EN ELLA.
  getUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(`${this.urlLocalUserApi}`);
  }

  //METODO PARA REGISTRAR UN NUEVO USUARIO -> PARA ELLOS SE REGISTRA NUEVO USUARIO SOBRE API
  addUser(user : User): Observable<any>{
    return this.httpClient.post<User>(`${this.urlLocalUserApi}`,user);
  }

}


