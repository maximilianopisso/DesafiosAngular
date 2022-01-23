import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userToDisplay } from 'src/app/models/userdisplay.model';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { userDiplay } from 'src/app/store/menu-user.actions';
import Swal from 'sweetalert2';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  //users: User[] = [];
  login: boolean = false;  //SOLO PARA TEST UNITARIO
  userLogedIn : userToDisplay | any ;
  userDisplay: string ="";
  constructor(
    private loginService: LoginService,
    private userService : UserService,
    private cartService : CartService,
    private router :Router,
    private store: Store

    ){
      console.log("LOGIN_COMPONENT - CONSTRUCTOR - CHECKED ");
      this.login = false;
    }

  ngOnInit(): void {
    console.log("LOGIN_COMPONENT - INIT - CHECKED ");
    console.log("USUARIOS DESDE LA API");
    this.userService.getUsers().subscribe(response => console.table(response));
  }

  ngAfterViewInit(): void {
    console.log("LOGIN_COMPONENT - AFTER VIEW INIT - CHECKED ");
    const lastElement: any = document.querySelector('.inputs');
    lastElement?.scrollIntoView();    //me redirije hacia la entrada de los campos despues que se inicia el componente.
    console.log("borro cart");

    this.cartService.clearCart().subscribe(response =>{
      console.log(response);
    });
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
        this.login = true;    //SOLO PARA TEST UNITARIO
        //  Swal.fire("BIENVIENIDO/A", this.loginService.getUserName(), "success"); // ACA ME TRAE EL NOMBRE UNDEFINED
        Swal.fire("BIENVIENIDO/A", this.loginService.getUserName(), "success");

//        console.log(this.loginService.getUserInfo);

        this.userLogedIn= this.loginService.getUserInfo();

        //PARA PRESENTAR EN MENU

        this.userDisplay = this.userLogedIn.nombre + ", "+ this. userLogedIn.apellido
        //console.log(this.userLogedIn);
        // localStorage.setItem('nombre', JSON.stringify(this.userLogedIn.nombre));
        // localStorage.setItem('apellido', JSON.stringify(this.userLogedIn.apellido));
        // localStorage.setItem('role', JSON.stringify(this.userLogedIn.role));
        // localStorage.setItem('login', JSON.stringify('true'));

        // ESTO ES PARA QUE MANDE LOS ESTADOS AL LOCALSTORE Y PUEDA TOMAR LOS DATOS DESDE EL MENU. COMO PAR PROBAR QUE LOS IFS DEL MENU FUNCIONAN

        this.store.dispatch(userDiplay ({username: this.userDisplay, role: this.userLogedIn.role}))
        this.router.navigate(['cartelera']);

      } else {
        this.login = false;   //SOLO PARA TEST UNITARIO
        //localStorage.setItem('login', JSON.stringify('false'));
        Swal.fire("ERROR", "El nombre email o la password son incorecctas", "error");
      }
    });


  }
}




