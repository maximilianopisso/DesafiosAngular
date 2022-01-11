import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from '../models/user.model'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(response => this.users = response);
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



}

// validateCredentials(user: string, password: string): Observable<boolean> {
//   return this.httpClient.post<any>(this.url, { user, password })
//   .pipe (
//     map(response => {
//       if (response.status === 'OK') {
//         this.token = response.token;
//         const decodedToken: any = jwt_decode(this.token);
//         this.user = decodedToken?.user;
//         this.userName = decodedToken?.userName;
//         return true;
//       } else {
//         this.token = null;
//         return false;
//       }
//     })
//   )
// }

// getToken(): any {
//   return this.token;
// }

// isUserLoggedIn() {
//   return this.user !== '';
// }

// getUserInfo(): any {
//   return {
//     user: this.user,
//     userName: this.userName
//   }
// }
// }


