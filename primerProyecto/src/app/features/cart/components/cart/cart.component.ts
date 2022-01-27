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
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {

  cartMovies: MovieAPI[] | any = [];
  urlPath: string = environment.urlPathImage

  movieList$!: Observable<CartState>
  status: string ="";

  constructor(

    private movieService: MovieService,
    private cartService: CartService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {

   this.store.pipe(
      select(cartStateSelector),
     // distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(data =>{
        console.log("Respuesta desde API",data);
      })
      ).subscribe(data => {
        this.cartMovies = data.movies
        this.status = data.status

        switch(this.status) {

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
            Swal.fire("ACCION RECHAZADA","No se pudo realizar la operacion solicitada", "error");
             break;
          }
        }
      })
  }
ngAfterViewInit(): void {}

ngOnDestroy(): void {}

vaciarCarrito(){
  this.store.dispatch(cartClear())
}

removeMovieFromCart(movie : MovieAPI){
  this.store.dispatch(cartDeleteMovie({ movie: movie }))
}

volverCartelera(){
  this.router.navigate(['cartelera']);
}

returnToDetailMovie(movie: MovieAPI){
  this.router.navigate(['cartelera', movie.id]);

}
}



