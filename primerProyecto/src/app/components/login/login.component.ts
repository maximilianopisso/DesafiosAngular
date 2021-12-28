import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
//import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  max_user : number = 10;
  muestra : User[] =[];
  users: User[] = [];

  constructor(private loginService: LoginService) {
    console.log("LOGIN_COMPONENT - CONSTRUCTOR - CHECKED ");
  }

  ngOnInit(): void {
    console.log("LOGIN_COMPONENT - INIT - CHECKED ");
    console.log("ESTOS SON LOS USARIOS VALIDOS");
    this.users = this.loginService.getUsers();

    for (let i=0;i<this.max_user;i++){
      this.muestra.push(this.users[i])
    }
    console.table(this.muestra);
  }

  ngAfterViewInit(): void {
    console.log("LOGIN_COMPONENT - AFTER VIEW INIT - CHECKED ");
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

    const valido = this.loginService.validateLogin(this.emailControl.value, this.passwordControl.value)

    if (valido) {
      console.log("Usuario y Contraseña son validos -> Ingresa")
    }
    else {
      console.log("No se le permite el ingreso -> No Valido")
    };
  }
}



