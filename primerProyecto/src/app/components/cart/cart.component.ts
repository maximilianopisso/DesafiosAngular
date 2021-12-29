import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from 'src/app/features/movies/services/movie.service';

import { MovieAPI } from 'src/app/models/movieAPI.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {

  movies: MovieAPI[] = [];

  constructor(private movieService : MovieService) {
    console.log("CART_COMPONENT - CONSTRUCTOR - CHECKED ");

   }
  ngOnInit(): void {
    this.movieService.getListAPI().subscribe(response => this.movies = response.results)
    console.log("CART_COMPONENT - INIT - CHECKED ");
  }
  ngAfterViewInit(): void {
    console.log("CART_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }
  ngOnDestroy(): void {
    console.log("CART_COMPONENT - DESTROY - CHECKED ");
  }
}
