import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, of } from 'rxjs';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { environment } from 'src/environments/environment.prod';


@Injectable()

export class MovieService {

  moviesAPI: MovieAPI[] = [];

  //URL DE LA API DE PELICULAS
  private urlMockApiMovies = environment.urlMockPelis;

  constructor(private httpClient: HttpClient) {
    // SE TREA LA COLECCION DE PELICULAS Y LAS CARGA EN EL ARREGLO DE PELICULAS PARA CARGAR EN CARTELERA.
    this.getListAPI().subscribe(response => {
      this.moviesAPI = response;
    });

  }


 // METODO QUE DEVUELVE UN OBSERVABLE QUE NOS TREA LA RESPUESTA DE LAS API CON TODAS LAS PELICULAS
  getListAPI(): Observable<MovieAPI[]> {
    return this.httpClient.get<MovieAPI[]>(this.urlMockApiMovies);
  }
// METODO QUE ME DEVUELVE UN OBSERVABLE CON LA PELICULA QUE COINCIDE CON EL ID PASADO COMO PARAMETRO.
  getDetailAPI(id: string): Observable<MovieAPI> {
    return this.httpClient.get<MovieAPI>(`${this.urlMockApiMovies}/${id}`);
  }
// NETODO PARA INCORPORAR UNA NUEVA PELICULA A CARTELERA -> PARA ELLO SE AGREGA LA PELICULA PASADA POR PARAMETRO A LA API UTILIZADA, SE VALIDA QUE YA NO EXISTE EL TITULO PREVIAMENTE
  addMovie(movie: MovieAPI): Observable<MovieAPI|String> {
    if (!this.moviesAPI.find((element) => element.title === movie.title)) {
      //SWEET
      alert("Se Agrego Movie");
      return this.httpClient.post<MovieAPI>(this.urlMockApiMovies, movie);

    } else {

      //SWEET
      alert('ya existe esa pelicula');
      return of("ya existe la pelicula");
    }

  }
  // METODO PARA MODIFICAR LOS DATOS UNA PELICULA DE LA CARTEPERA -> PARA ELLO GENERAN LAS MODIFICACIONES EN LA API, PASANDO LA NUEVA PELICULA COMO PARAMETRO
  updateMovie(movie: MovieAPI): Observable<MovieAPI> {
    return this.httpClient.put<MovieAPI>(`${this.urlMockApiMovies}/${movie.id}`, movie);
  }

  // METODO PARA ELIMINAR UNA PELICULA DE LA CARTEPERA -> PARA ELLO SE ELIMINA LA PELICULA PASANDO SU ID COMO ARGUMENTO DESDE LA API
   removeMovie(id: Number): Observable<MovieAPI> {
    return this.httpClient.delete<MovieAPI>(`${this.urlMockApiMovies}/${id}`);
  }

}

