import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptionsRegister = new Subscription


  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void { }

  ngAfterViewInit(): void {
    //PARA REDIRIGIR LA CARGA DE LA PAGINA A LOS INPUTS DE REGISTRO DE UN NUEVO USUARIO
    const lastElement: any = document.querySelector('.logo');
    lastElement?.scrollIntoView();    //me redirije hacia la entrada de los campos despues que se inicia el componente.
  }
  ngOnDestroy(): void {
    this.subscriptionsRegister.unsubscribe();
  }

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    apellido: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    movil: new FormControl('', [Validators.required, Validators.pattern('[+0-9 ]{10,20}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]* [0-9]{1,4}')]),

  });

  nombreControl = this.registroForm.controls['nombre'];
  apellidoControl = this.registroForm.controls['apellido'];
  movilControl = this.registroForm.controls['movil'];
  emailControl = this.registroForm.controls['email'];
  passwordControl = this.registroForm.controls['password'];
  addressControl = this.registroForm.controls['address'];


  registroUser() {

    let newUser: User =
    {
      id: undefined,
      nombre: this.nombreControl.value,
      apellido: this.apellidoControl.value,
      direccion: this.addressControl.value,
      movil: this.movilControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
      role: "user"
    }

    console.log("Datos de Usuario a Registrar");
    console.table(newUser);

    this.subscriptionsRegister.add(
      this.userService.addUser(newUser).subscribe(response => {
        console.log("Datos Registrados:");
        console.log(response);
        console.log(response.status);

        if (response.status === "OK") {
          Swal.fire("NUEVO USUARIO", "Se registro existosamente un nuevo usuario", "success");
          this.registroForm.reset();
          this.router.navigate(['login']);
        } else {
          Swal.fire("ERROR", "No se pudo registrar nuevo usuario", "error");   //"warning", "error", "success" and "info".
        }
      }, (err) => {
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
      })
    )
  }

  loginRoute() {
    this.router.navigate(['login']);
  }

}


