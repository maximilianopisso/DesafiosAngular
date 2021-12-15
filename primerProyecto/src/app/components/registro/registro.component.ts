import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor() { }
  //   private userService: UserServiceService)
  //   { }
  //   users: User[] = [];


  ngOnInit(): void {
    // this.userService.getUser().subscribe(users => this.users = users);
    // console.log();

  }

  registroForm = new FormGroup ({
    nombre: new FormControl ('', [Validators.required, Validators.maxLength(25)]),
    apellido: new FormControl ('', [Validators.required, Validators.maxLength(25)]),
    movil: new FormControl ('', [Validators.required]),
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(8)])
  });

  nombreControl = this.registroForm.controls['nombre'];
  apellidoControl = this.registroForm.controls['apellido'];
  movilControl = this.registroForm.controls['movil'];
  emailControl = this.registroForm.controls['email'];
  passwordControl = this.registroForm.controls['password'];

  registroUser(){
    console.log(this.registroForm.value);
  }

}
