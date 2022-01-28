import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinct, distinctUntilChanged, Observable, ObservedValueOf, Subscription, tap } from 'rxjs';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { CartState } from '../../store/cart-store.state';
import { cartClear, cartDeleteMovie } from '../../store/cart.actions';
import { cartStateSelector } from '../../store/cart.selector';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartMovies: MovieAPI[] | any = [];
  urlPath: string = environment.urlPathImage

  movieList$!: Observable<CartState>
  status: string = "";

  constructor(

    private movieService: MovieService,
    private cartService: CartService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    //ESCUCHO LOS CAMBIOS EN EL STORE SOBRE EL SELECTOR QUE SE ACTUALIZA CON CADA ACCCION SOBRE EL CARRITO
    this.store.pipe(
      select(cartStateSelector),
      tap(data => {
        console.log("Respuesta desde API", data);
      })
    ).subscribe(data => {
      this.cartMovies = data.movies
      this.status = data.status


      //EN FUNCION DEL ESTADO QUE VIENE DE LA API, MUESTRO EL MODAL CON LA OPERACION REALIZADA Y SU ESTADO
      switch (this.status) {

        case "OK-ADDED": {
          Swal.fire("PELICULA AGREGADA", "Se agrego una nueva pelicula a tu seleccion", "success");
          break;
        }
        case "OK-DELETED": {
          Swal.fire("PELICULA ELIMINADA", "Se elimino la pelicula de tu seleccion", "warning");
          break;
        }
        case "CLEAN": {
          break;
        }
        default: {
          Swal.fire("ACCION RECHAZADA", "No se pudo realizar la operacion solicitada", "error");
          break;
        }
      }
    })
  }

  vaciarCarrito() {
    this.store.dispatch(cartClear())
  }

  removeMovieFromCart(movie: MovieAPI) {
    //REMUEVO LA PELICULA PASADA COMO PARAMETRO DEL CARRITO
    this.store.dispatch(cartDeleteMovie({ movie: movie }))
  }

  volverCartelera() {
    // METODO PARA REDIRIGIR A LA CARTELERA
    this.router.navigate(['cartelera']);
  }

  returnToDetailMovie(movie: MovieAPI) {
    // METODO PARA REDIRIGIR AL DETALLE DE LA PELICULA PASADA COMO PARAMETRO
    this.router.navigate(['cartelera', movie.id]);

  }
}



