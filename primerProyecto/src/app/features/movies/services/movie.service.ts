import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI, MoviesAPI } from 'src/app/models/movieAPI.model';
import { environment } from 'src/environments/environment.prod';
import { MoviesModule } from '../movies.module';
import { moviesMock } from './movies.mock';

@Injectable()

export class MovieService {
  private urlAllMovies = environment.urlMovieAPI;
  private urlFirstPart = environment.urlAPI;
  private urlLastPart = environment.keyAPI
  constructor(private httpClient : HttpClient) { }




  getListAPI(): Observable<MoviesAPI>{
    return this.httpClient.get<MoviesAPI>(this.urlAllMovies);
  }

  getDetailAPI(id:string): Observable<MovieAPI> {
    return this.httpClient.get<MovieAPI>(`${this.urlFirstPart}${id}${this.urlLastPart}`);
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
