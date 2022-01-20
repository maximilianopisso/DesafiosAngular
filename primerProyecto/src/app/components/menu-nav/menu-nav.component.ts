import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { showUser } from 'src/app/features/login-redux/store/login.actions';
import { userDisplay } from 'src/app/features/login-redux/user..model';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {

  user: userDisplay = {
    email: "",
    apellido: "",
    nombre: "",
    role : "",
    token: ""
  }

  //user$!: Observable<userDisplay>;

  constructor(
    private store: Store
    ) { }


    ngOnInit(): void {
    console.log("INICIA COMPONENTE MENU");

     this.user.apellido = JSON.parse(localStorage.getItem("apellido") || ""),
     this.user.nombre = JSON.parse(localStorage.getItem("nombre") || ""),
     this.user.role = JSON.parse(localStorage.getItem("role") || ""),

     console.log(JSON.parse(localStorage.getItem("apellido") || ""))
    // this.user$ = this.store.pipe(
    //   select(showUser)
    // );

  }

}
