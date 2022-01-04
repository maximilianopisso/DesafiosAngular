import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {

  //private users: User[] = [];

  constructor(private userService: UserService) {
    console.log("REGISTER_COMPONENT - CONSTRUCTOR - CHECKED ");
  }


  ngOnInit(): void {
    console.log("REGISTER_COMPONENT - INIT - CHECKED ");
  }

  ngAfterViewInit(): void {
    console.log("REGISTER_COMPONENT - AFTER VIEW INIT - CHECKED ");
    const lastElement: any = document.querySelector('.logo');
    lastElement?.scrollIntoView();    //me redirije hacia la entrada de los campos despues que se inicia el componente.
  }
  ngOnDestroy(): void {
    console.log("REGISTER_COMPONENT - DESTROY - CHECKED ");
  }

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    movil: new FormControl('', [Validators.required, Validators.pattern ('[+0-9 ]{10,20}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]* [0-9]{1,4}')]),
   // passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  nombreControl = this.registroForm.controls['nombre'];
  apellidoControl = this.registroForm.controls['apellido'];
  movilControl = this.registroForm.controls['movil'];
  emailControl = this.registroForm.controls['email'];
  passwordControl = this.registroForm.controls['password'];
  addressControl = this.registroForm.controls['address'];
  //passwordConfirmControl = this.registroForm.controls['passwordConfirm'];

  registroUser() {

    let newUser: User =
    {
      id: '',
      nombre: this.nombreControl.value,
      apellido: this.apellidoControl.value,
      direccion: this.addressControl.value,
      movil: this.movilControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
    }

    console.log("Datos de Usuario a Registrar");
    console.table(newUser);
    this.userService.addUser(newUser).subscribe(response => {alert(`Se cargo usuario correctamente`)
      console.log(response);

    });
    this.registroForm.reset();
  }

}
