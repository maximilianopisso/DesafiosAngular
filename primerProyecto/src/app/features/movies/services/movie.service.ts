import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI, MoviesAPI } from 'src/app/models/movieAPI.model';
import { environment } from 'src/environments/environment.prod';
import { MoviesModule } from '../movies.module';
import { moviesMock } from './movies.mock';

@Injectable()

export class MovieService {
  private url = environment.urlMovieAPI;
  constructor(private httpClient : HttpClient) { }


  getDetail (id:string): Observable<Movie | undefined>  {
    return of (moviesMock.find( movie => movie.id === id))
  }

  getList(): Observable<Movie[]>{
    return of(moviesMock);
  }

  getListAPI(): Observable<MoviesAPI>{
    return this.httpClient.get<MoviesAPI>(this.url);
  }

  // getMovieByTitle(title:string): Observable<Movie | undefined>  {
  //   return of(moviesMock.find(movie => movie.title === title))
  // }
}
