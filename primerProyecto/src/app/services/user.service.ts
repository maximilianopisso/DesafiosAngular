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
      return this.httpClient.get<User[]>(`${this.url}persons`);
  }

  addUser(user : User){
      this.httpClient.post(`${this.url}addperson`,JSON.stringify(user));
  }

  // getUser(id:number){}

}


