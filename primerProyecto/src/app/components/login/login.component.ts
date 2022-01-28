import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { cartClear } from 'src/app/features/cart/store/cart.actions';
import { userToDisplay } from 'src/app/models/userdisplay.model';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { userClear, userDiplay } from 'src/app/store/menu-user.actions';
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

  ) { }




  ngOnInit(): void {

    this.clearStore()   //BORRO STORE DE USUARIOS Y CARRITO

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
    //PARA REDIRIGIR LA CARGA DE LA PAGINA A AL INPUT DE INGRESO DEL USUARIO Y LA PASS.
    const lastElement: any = document.querySelector('.inputs');
    lastElement?.scrollIntoView();
  }

  ngOnDestroy(): void {
    this.subscriptionsLogin?.unsubscribe
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  emailControl = this.loginForm.controls['email'];
  passwordControl = this.loginForm.controls['password'];

  loginValidate() {
    //MUESTRA LOS USUARIOS POR CONSOLA PARA SABER LOS USUARIOS HABILITADOS PARA LOGIN
    this.subscriptionsLogin.add(
      this.loginService.validateCredentials(this.emailControl.value, this.passwordControl.value)
        .subscribe(valid => {

          if (valid) {
            this.login = true;    //SOLO PARA TEST UNITARIO
            this.userLogedIn = this.loginService.getUserInfo()        //OBTENGO DATOS PARA PRESENTAR EN EL MENU-NAV

            Swal.fire("BIENVIENIDO/A", this.userLogedIn.nombre + " " + this.userLogedIn.apellido, "success");

            //DISPARO ACCION PARA CAMBIAR LA VISTA DEL MENU-NAV
            this.store.dispatch(userDiplay({ username: this.userLogedIn.nombre + ", " + this.userLogedIn.apellido, role: this.userLogedIn.role }))
            this.router.navigate(['cartelera']);

          } else {
            this.login = false;   //SOLO PARA TEST UNITARIO
            Swal.fire("ERROR", "El nombre email o la password son incorecctas", "error");
          }
        }, (err) => {
          console.log("Faltal Error")
          console.log(err);
          Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        })
    );
  }

  clearStore() {
    this.store.dispatch(cartClear());
    this.store.dispatch(userClear());
  }
}




