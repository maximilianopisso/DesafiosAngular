import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { userToDisplay } from 'src/app/models/userdisplay.model';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { MetaService } from 'src/app/services/meta.service';
import { UserService } from 'src/app/services/user.service';
import { userDiplay } from 'src/app/store/menu-user.actions';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  login: boolean = false;  //SOLO PARA TEST UNITARIO
  userLogedIn: userToDisplay | any;
  userDisplay: string = "";

  private subscriptionsLogin = new Subscription;



  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private store: Store,
    private meta : MetaService

  ) {
    console.log("LOGIN_COMPONENT - CONSTRUCTOR - CHECKED ");
  }




  ngOnInit(): void {

    this.meta.updateTitle()

    console.log("LOGIN_COMPONENT - INIT - CHECKED ");
    console.log("USUARIOS DESDE LA API");
    this.subscriptionsLogin.add(
      this.userService.getUsers().subscribe(response => {
        console.table(response)
      }, (err) => {
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        }
      )
    );
  }

  ngAfterViewInit(): void {
    console.log("LOGIN_COMPONENT - AFTER VIEW INIT - CHECKED ");
    const lastElement: any = document.querySelector('.inputs');
    lastElement?.scrollIntoView();    //me redirije hacia la entrada de los campos despues que se inicia el componente.
  }

  ngOnDestroy(): void {
    console.log("LOGIN_COMPONENT - DESTROY - CHECKED ");
    this.subscriptionsLogin?.unsubscribe
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  emailControl = this.loginForm.controls['email'];
  passwordControl = this.loginForm.controls['password'];

  loginValidate() {
    this.subscriptionsLogin.add(
      this.loginService.validateCredentials(this.emailControl.value, this.passwordControl.value)
        .subscribe(valid => {

          if (valid) {
            this.login = true;    //SOLO PARA TEST UNITARIO

            Swal.fire("BIENVIENIDO/A", this.loginService.getUserName(), "success");
            this.userLogedIn = this.loginService.getUserInfo()        //PARA PRESENTAR EN MENU

            this.store.dispatch(userDiplay({ username: this.userLogedIn.nombre + ", " + this.userLogedIn.apellido, role: this.userLogedIn.role }))
            this.router.navigate(['cartelera']);

          } else {
            this.login = false;   //SOLO PARA TEST UNITARIO
            Swal.fire("ERROR", "El nombre email o la password son incorecctas", "error");
          }
        },(err)=>{
          console.log("Faltal Error")
          console.log(err);
          Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        })
    );


  }
}




