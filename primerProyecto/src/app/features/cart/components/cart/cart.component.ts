import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, ObservedValueOf, Subscription } from 'rxjs';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { CartService } from 'src/app/services/cart.service';
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

  cartMovies: MovieAPI[]|any = [];
  urlPath: string = 'https://image.tmdb.org/t/p/w500';

  private subscriptionsCart = new Subscription;
  private movieList$!: Observable<CartState>;

  constructor(

    private movieService : MovieService,
    private cartService : CartService,
    private router : Router,
    private store: Store,
    ) {
    console.log("CART_COMPONENT - CONSTRUCTOR - CHECKED ");

   }
  ngOnInit(): void {
   console.log("CART_COMPONENT - INIT - CHECKED ");

   this.movieList$ = this.store.pipe(
    select(cartStateSelector)
  )
  this.subscriptionsCart.add(
    this.movieList$.subscribe(data => this.cartMovies = data.movies)
  )


   //  this.subscriptionsCart.add(
  //     this.cartService.getCart().subscribe(response => {
  //       this.cartMovies = response
  //     }, (err) => {
  //       console.log("Faltal Error")
  //       console.log(err);
  //       Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
  //       }
  //     )
  //   )
  }
  ngAfterViewInit(): void {
    console.log("CART_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }
  ngOnDestroy(): void {
    this.subscriptionsCart.unsubscribe();
    console.log("CART_COMPONENT - DESTROY - CHECKED ");
  }

  vaciarCarrito(){

    this.store.dispatch(cartClear())
    
    this.movieList$ = this.store.pipe(
      select(cartStateSelector)
    )
    this.subscriptionsCart.add(
      this.movieList$.subscribe(data => this.cartMovies = data.movies)
    )


    // this.subscriptionsCart.add(
    //   this.cartService.clearCart().subscribe(response =>{
    //     console.log(response);
    //     this.subscriptionsCart.add(
    //       this.cartService.getCart().subscribe(response => this.cartMovies = response)
    //     )
    //   },(err) => {
    //     console.log("Faltal Error")
    //     console.log(err);
    //     Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
    //     }
    //   )
    // )
  }

  removeMovieFromCart(movie : MovieAPI){

    this.store.dispatch(cartDeleteMovie({movie:movie}))
    this.movieList$ = this.store.pipe(
      select(cartStateSelector)
    )
    this.subscriptionsCart.add(
      this.movieList$.subscribe(data => this.cartMovies = data.movies)
    )


    //,(err) => {
      //     console.log("Faltal Error")
      //     console.log(err);
      //     Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
      //     }
      //   )


    // this.subscriptionsCart.add(
    //     this.cartService.removeMovie(movie).subscribe(response => {
    //     console.log(response);

    //     if (response.status !== 'OK'){
    //       alert ("NO SE PUDO BORRAR LA PELICULA SELECCIONADA")
    //     }else{
    //       this.subscriptionsCart.add(
    //         this.cartService.getCart().subscribe(response => this.cartMovies = response)
    //       );
    //     }
    //   },(err) => {
    //     console.log("Faltal Error")
    //     console.log(err);
    //     Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
    //     }
    //   )
    // )
  }

  volverCartelera(){
    this.router.navigate(['cartelera']);
  }

  returnToDetailMovie(movie: MovieAPI){
    this.router.navigate(['cartelera', movie.id]);

  }
}



