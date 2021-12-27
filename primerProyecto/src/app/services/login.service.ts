import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string = "https://61bcb895d8542f00178249b1.mockapi.io/api/";
  users:User[] = [];

  constructor(private httpClient : HttpClient) {
    this.httpClient.get<User[]>(`${this.url}persons`).subscribe( user => this.users = user);
    console.log(`CONSTRUCCION USERS ${this.users}`);
  }


  validateLogin(email:string,password:string): boolean {

    console.log(this.users);
    var respuesta: boolean = false;

    this.users.forEach(usuario => {
      if (usuario.email === email && usuario.password === password) {
        respuesta = true;
      }
    });
    return respuesta;
  }
}


