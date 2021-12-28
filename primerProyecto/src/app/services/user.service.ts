import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = "https://61bcb895d8542f00178249b1.mockapi.io/api/";

  private users: User[] = [];

  constructor(private httpClient : HttpClient) {}


  getUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(`${this.url}persons`);
  }

  // addUser(){}

  // getUser(id:number){}

}


