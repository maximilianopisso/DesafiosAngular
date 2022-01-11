import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { MovieService } from '../features/movies/services/movie.service';
import { MovieAPI } from '../models/movieAPI.model';

@Injectable({
  providedIn: 'root'
})


export class CartService {


  private listMovie: MovieAPI[] = [];
  urlCart = environment.urlLocalCart;

  constructor(
    private movieService: MovieService,
    private httpClient: HttpClient
  ) { }


  // METODO PARA OBTENER EL LISTADO COMPLETO DE PELICULAS EN EL CARRITO DE COMPRAS (DESDE LA API)
  getCart(): Observable<MovieAPI[]> {
    return this.httpClient.get<MovieAPI[]>(`${this.urlCart}`);
  }

  // METODO PARA AGREGAR UNA NUEVA PELICULA AL CARRITO DE COMPRAS (DESDE LA API)
  addMovie(movie: MovieAPI): Observable<any> {
    return this.httpClient.post<any>(this.urlCart, movie)
  }

  // // METODO PARA VACIAR EL CARRITO DE COMPRAS (DESDE LA API)
  clearCart(): Observable<MovieAPI[]> {
    return this.httpClient.delete<MovieAPI[]>(`${this.urlCart}/clear`);
  }

  removeMovie(movie: MovieAPI): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlCart}/?id=${movie.id}`)
  }
  // setList(listMovie: MovieAPI[]) {
  //   this.listMovie = listMovie;
  // }
}


