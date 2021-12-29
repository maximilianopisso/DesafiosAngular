import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private movieService : MovieService,
    private cartService : CartService,
    private router : Router
    ) {
    console.log("CART_COMPONENT - CONSTRUCTOR - CHECKED ");

   }
  ngOnInit(): void {
    // this.movieService.getListAPI().subscribe(response => {this.cartMovies = response.results
    // this.cartService.setList(this.cartMovies);
    // })
    this.cartMovies=this.cartService.getList();
    console.log("CART_COMPONENT - INIT - CHECKED ");
  }
  ngAfterViewInit(): void {
    console.log("CART_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }
  ngOnDestroy(): void {
    console.log("CART_COMPONENT - DESTROY - CHECKED ");
  }

  vaciarCarrito(){
    this.cartMovies= this.cartService.clear();
  }

  removeItem(movie : MovieAPI){
    console.log(movie);
    console.table(this.cartMovies);

    this.cartMovies=this.cartService.remove(movie);

  }

  volverCartelera(){
    this.router.navigate(['cartelera']);
  }
}



