import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI} from 'src/app/models/movieAPI.model';
import { environment } from 'src/environments/environment.prod';
import { MoviesModule } from '../movies.module';
import { moviesMock } from './movies.mock';

@Injectable()

export class MovieService {

 // private urlAllMovies = environment.urlMovieAPI;
 // private urlFirstPart = environment.urlAPI;
 // private urlLastPart = environment.keyAPI

  private urlMockApiMovies = environment.urlMockPelis;

  constructor(private httpClient : HttpClient) { }

  getListAPI(): Observable<MovieAPI[]>{                           //Metodo que me devuelve el Observable que me trae la respuesta de la API con todas las peliculas
    return this.httpClient.get<MovieAPI[]>(this.urlMockApiMovies);
  }

  getDetailAPI(id:string): Observable<MovieAPI> {                // Metodo que me devuelve el Observable  con la pelicula que coincide con el ID pasado como parametro
    return this.httpClient.get<MovieAPI>(`${this.urlMockApiMovies}/${id}`);
  }

  addMovie(movie :MovieAPI): Observable<MovieAPI> {
    return this.httpClient.post<MovieAPI>(`${this.urlMockApiMovies}`,movie);
  }
  updateMovie(movie :MovieAPI): Observable<MovieAPI> {
    return this.httpClient.put<MovieAPI>(`${this.urlMockApiMovies}/${movie.id}`,movie);
  }
  removeMovie(id :Number): Observable<MovieAPI> {
    return this.httpClient.delete<MovieAPI>(`${this.urlMockApiMovies}/${id}`);
  }

  // getDetail (id:string): Observable<Movie | undefined>  {
  //   return of (moviesMock.find( movie => movie.id === id))
  // }

  // getList(): Observable<Movie[]>{
  //   return of(moviesMock);
  // }

  // getMovieByTitle(title:string): Observable<Movie | undefined>  {
  //   return of(moviesMock.find(movie => movie.title === title))
  // }
}
