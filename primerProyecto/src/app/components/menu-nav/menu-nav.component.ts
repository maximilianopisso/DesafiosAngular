import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { showUser } from 'src/app/features/login-redux/store/login.actions';
import { userDisplay } from 'src/app/features/login-redux/user..model';
import { appTitleSelector } from 'src/app/store/app.selectors';

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

  title$: Observable<string> = of("")
  //user$!: Observable<userDisplay>;

  constructor(
    private store: Store
    ) {}


    ngOnInit(): void {
    console.log("INICIA COMPONENTE MENU");

     this.user.apellido = JSON.parse(localStorage.getItem("apellido") || ""),
     this.user.nombre = JSON.parse(localStorage.getItem("nombre") || ""),
     this.user.role = JSON.parse(localStorage.getItem("role") || ""),
     console.log(JSON.parse(localStorage.getItem("apellido") || ""))

    this.title$ = this.store.pipe(
      select(appTitleSelector)
    );

  }

}
