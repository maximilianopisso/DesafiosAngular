import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model';
import jwt from "jsonwebtoken";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlMockApi = environment.urlUsersAPI;
  private urlLocalUserApi = environment.urlLocalLogin;
  private users: User[] = [];
  constructor(private httpClient : HttpClient) {}

  getUsers(): Observable<User[]> {
      //return this.httpClient.get<User[]>(`${this.urlMockApi}`);    //Metodo para obtener los usuarios de la API
      return this.httpClient.get<User[]>(`${this.urlLocalUserApi}`);
  }

  addUser(user : User): Observable<User>{
     // return this.httpClient.post<User>(`${this.urlMockApi}`,user);   //Metodo para setear un nuevo usuario en la API (Registrar Usuario)
    const SECURE_KEY_APP = "clave_app_2022"
    const token = jwt.sign(user, SECURE_KEY_APP);

    return this.httpClient.post<User>(`${this.urlLocalUserApi}`,token);
     //return this.httpClient.post<User>(`${this.urlLocalUserApi}`,user);
  }

  // getUserById(id:number): Observable<User | undefined> {      //Metodo obtener un usuario desde la API indicando su id.
  //   return this.httpClient.get<User>(`${this.urlMockApi}/${id}`);
  // }

}


