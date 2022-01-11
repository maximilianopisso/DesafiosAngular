import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  users: User[] = [];

  constructor(
    private loginService: LoginService,
    private userService : UserService,
    private router :Router

    ){
      console.log("LOGIN_COMPONENT - CONSTRUCTOR - CHECKED ");
    }

  ngOnInit(): void {
    console.log("LOGIN_COMPONENT - INIT - CHECKED ");
    // this.users = this.loginService.getUsers();
    // console.table(this.users);
    console.log("USUARIOS DESDE LA API");
    this.userService.getUsers().subscribe(response => console.table(response));


  }

  ngAfterViewInit(): void {
    console.log("LOGIN_COMPONENT - AFTER VIEW INIT - CHECKED ");
    const lastElement: any = document.querySelector('.inputs');
    lastElement?.scrollIntoView();    //me redirije hacia la entrada de los campos despues que se inicia el componente.
  }

  ngOnDestroy(): void {
    console.log("LOGIN_COMPONENT - DESTROY - CHECKED ");
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  emailControl = this.loginForm.controls['email'];
  passwordControl = this.loginForm.controls['password'];

  loginValidate() {

    this.loginService.validateCredentials(this.emailControl.value, this.passwordControl.value )
    .subscribe(valid => {
      if (valid) {
        this.router.navigate(['cartelera']);
      } else {
        alert('User or Password invalid');
      }
    });
  }
}

  //   const valido = this.loginService.validateLogin(this.emailControl.value, this.passwordControl.value)

  //   if (valido) {
  //     console.log("Usuario y Contraseña son validos -> Ingresa")
  //     this.router.navigate(['cartelera']);
  //   }

  //   else {
  //     console.log("No se le permite el ingreso -> No Valido")
  //     alert("USUARIO O CONTRASEÑA INCORRECTA")
  //   };
  // }




