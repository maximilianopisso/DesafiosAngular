import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from '../models/user.model'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private url:string = "https://61bcb895d8542f00178249b1.mockapi.io/api/";

  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(response => this.users = response);
  }

  getUsers(): User[] {
    return this.users;
  }

  validateLogin(email: string, password: string): boolean {
    var respuesta: boolean = false;
    this.users.forEach(usuario => {
      if (usuario.email === email && usuario.password === password) {
        respuesta = true;
      }
    });
    return respuesta;
  }
}


