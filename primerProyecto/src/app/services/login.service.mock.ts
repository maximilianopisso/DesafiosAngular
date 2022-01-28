import { environment } from "src/environments/environment.prod";
import { User } from 'src/app/models/user.model';
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { userToDisplay } from "../models/userdisplay.model";

export const LoginServiceMock = {


  //private users: any;
  //url = environment.urlLocalLogin


  validateCredentials(email: string, password: string): Observable<boolean> {
    return of(true);
  },


  getToken(): any {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heGltaWxpYW5vLnBpc3NvQGdtYWlsLmNvbSIsIm5vbWJyZSI6IkFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0MjUyMjQyMH0.Is-m_v9xxx2zpRoxdgzSR9SOirGomUSsgHNTNEhQA9w"
  },

  isUserLoggedIn(): boolean {
    return true;
  },

  getUserInfo(): userToDisplay{
    return {
      "email": "maximiliano.pisso@gmail.com",
      "nombre": "Admin",
      "apellido": "Admin",
      "role": "admin",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heGltaWxpYW5vLnBpc3NvQGdtYWlsLmNvbSIsIm5vbWJyZSI6IkFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0MjUyMjQyMH0.Is-m_v9xxx2zpRoxdgzSR9SOirGomUSsgHNTNEhQA9w"
    }
  },

    getUserName(): string {
      return "Pruebas Unitarias"
    },
}

