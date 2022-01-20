import { Observable, of } from "rxjs";
import { User } from "../models/user.model";

export const UserServiceMock = {

  //METODO PARA OBTENER DESDE LA API DE USUARIO, EL LISTADO DE USUARIOS EN ELLA.
  getUsers(): Observable<User[]> {
      return of (
        [
          {
            "id":1,
            "nombre":"Admin",
            "apellido":"Lopez",
            "direccion":"Rosario 1234",
            "movil":"+54 3416346585",
            "email":"maximiliano.pisso@gmail.com",
            "password":"12345678",
            "role":"admin"
          },
          {
            "id":2,
            "nombre":"User",
            "apellido":"Perez",
            "direccion":"Corrientes 154",
            "movil":"+54 3416556688",
            "email":"user@gmail.com",
            "password":"11223344",
            "role":"user"
          }
      ])
    },

    //METODO PARA REGISTRAR UN NUEVO USUARIO -> PARA ELLOS SE REGISTRA NUEVO USUARIO SOBRE API
   addUser(user: User): Observable<any> {
      return of(true)
    }
}




