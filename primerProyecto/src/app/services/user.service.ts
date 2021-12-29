import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.urlUsersAPI;
  private users: User[] = [];
  constructor(private httpClient : HttpClient) {}

  getUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(`${this.url}`);    //Metodo para obtener los usuarios de la API
  }

  addUser(user : User): Observable<User>{
      return this.httpClient.post<User>(`${this.url}`,user);   //Metodo para setear un nuevo usuario en la API (Registrar Usuario)
  }

  getUserById(id:number): Observable<User | undefined> {      //Metodo obtener un usuario desde la API indicando su id.
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

}


