import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { userToDisplay } from 'src/app/models/userdisplay.model';
import { userState } from 'src/app/store/user-state.model';
import { userDisplaySelector } from 'src/app/store/meu-user.selectors';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { userDiplay } from 'src/app/store/menu-user.actions';


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

  response$: Observable<any> = of({ username: "", role: "" })

  constructor(
    private store: Store,
    private loginService: LoginService,
    private cartService: CartService,
    private router: Router
  ) { }


  ngOnInit(): void {
    console.log("INICIA COMPONENTE MENU");

    //  this.user.apellido = JSON.parse(localStorage.getItem("apellido") || ""),
    //  this.user.nombre = JSON.parse(localStorage.getItem("nombre") || ""),
    //  this.user.role = JSON.parse(localStorage.getItem("role") || ""),
    //  console.log(JSON.parse(localStorage.getItem("apellido") || ""))

    this.response$ = this.store.pipe(
      select(userDisplaySelector)
    );

  }


  signOut() {

    Swal.fire({
      title: 'ATENCION',
      text: "Estas por cerrar tu sesion y perderas todas las operaciones efectuadas sin guardar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar Sesion'

    }).then((result) => {
      if (result.value) {
        this.cartService.clearCart().subscribe(response => {
          console.log(response)
        });
        this.loginService.signOutUser();
        this.store.dispatch(userDiplay({ username: "", role: "" }))
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


