import { Injectable } from '@angular/core'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private usuarios: User[] = [
    {
      nombre: "Tamara",
      apellido: "Sultano",
      direccion: "Paraguay 2054",
      movil: 34154568534,
      email: "tsultano@gmail.com",
      password: "tama1234",
    },
    {
      nombre: "Maximiliano",
      apellido: "Hernandez",
      direccion: "Tucuman 154",
      movil: 3415684579,
      email: "mpisso@gmail.com",
      password: "maxi1234",
    },
    {
      nombre: "Felicia",
      apellido: "Ramos",
      direccion: "Centeno 54",
      movil: 3415689535,
      email: "framos@gmail.com",
      password: "feli1234",
    },
  ]

  constructor() {}


  validarUser(email:string,password:string): boolean {
    var respuesta: boolean = false;

    this.usuarios.forEach(usuario => {
      if (usuario.email === email && usuario.password === password) {
        respuesta = true;
      }
    });
    return respuesta;
  }
}


