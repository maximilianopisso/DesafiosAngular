import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, tap } from 'rxjs';
import { userToDisplay } from 'src/app/models/userdisplay.model';
import { userState } from 'src/app/store/user-state.model';
import { userDisplaySelector } from 'src/app/store/menu-user.selectors';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { userClear, userDiplay } from 'src/app/store/menu-user.actions';
import { cartClear } from 'src/app/features/cart/store/cart.actions';


@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})

export class MenuNavComponent implements OnInit {

  user: userToDisplay = {
    email: "",
    apellido: "",
    nombre: "",
    role: "",
    token: ""
  }
  state$: Observable<userState> = of({ username: "", role: "" });
  username: string = "";
  role: string = "";


  constructor(
    private store: Store,
    private loginService: LoginService,
    private cartService: CartService,
    private router: Router
  ) { }


  ngOnInit(): void {
    //ESCUCHO LOS CAMBIOS EN EL STORE SOBRE EL SELECTOR QUE SE DISPARA AL LOGEAR UN USUARIO VALIDO
    this.state$ = this.store.pipe(
      select(userDisplaySelector),
    );

    //SEPARO LO QUE VIENE DEL STORE PARA MOSTAR DE FORMA SEPARADA EL NOMBRE DEL USUARIO Y SU ROL ASOCIADO
    this.state$.subscribe(state => {
      this.username = state.username
      this.role = state.role
    });
  }

  signOut() {

    Swal.fire({
      title: 'ATENCION',
      text: "¿Deseas cerrar tu sesion? Perderás todas las operaciones efectuadas sin guardar",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cerrar Sesion'

    }).then((result) => {
      if (result.value) {

        this.store.dispatch(cartClear());                                 //SE BORRA EL ESTADO DEL CARRO EN EL STORE
        this.store.dispatch(userClear())                                 //SE BORRA EL ESTADO DEL USUARIO EN EL STORE
        this.loginService.signOutUser();                                  //SE INICIALIZA LOS DATOS DEL USUARIO EN BLANCO

        Swal.fire(
          'Tu sesion ha sido cerrada',
          'Muchas gracias por visitarnos !',
          'success'
        )
        this.router.navigate(['login']);
      }
    })
  }
}


