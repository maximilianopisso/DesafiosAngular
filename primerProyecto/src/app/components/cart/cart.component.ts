import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {

  cartMovies: MovieAPI[]|any = [];
  urlPath: string = 'https://image.tmdb.org/t/p/w500';

  private subscriptions: Subscription | undefined;


  constructor(

    private movieService : MovieService,
    private cartService : CartService,
    private router : Router
    ) {
    console.log("CART_COMPONENT - CONSTRUCTOR - CHECKED ");

   }
  ngOnInit(): void {
   console.log("CART_COMPONENT - INIT - CHECKED ");
   this.subscriptions = this.cartService.getCart().subscribe(response => this.cartMovies = response)
  }
  ngAfterViewInit(): void {
    console.log("CART_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
    console.log("CART_COMPONENT - DESTROY - CHECKED ");
  }

  vaciarCarrito(){   

      this.cartService.clearCart().subscribe(response =>{
      console.log(response);
      this.cartService.getCart().subscribe(response => this.cartMovies = response);
     })

  }

  removeMovieFromCart(movie : MovieAPI){

      this.cartService.removeMovie(movie).subscribe(response => {
      console.log(response);
      if (response.status !== 'OK'){
        alert ("NO SE PUDO BORRAR LA PELICULA SELECCIONADA")
      }else{
        this.cartService.getCart().subscribe(response => this.cartMovies = response);
      }
    });

  }

  volverCartelera(){
    this.router.navigate(['cartelera']);
  }

  returnToDetailMovie(movie: MovieAPI){
    this.router.navigate(['cartelera', movie.id]);

  }
}



