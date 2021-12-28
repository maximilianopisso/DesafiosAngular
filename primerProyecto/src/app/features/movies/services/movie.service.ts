import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MoviesModule } from '../movies.module';
// import { Movie } from '../models/movie.model';
import { moviesMock } from './movies.mock';

@Injectable()

export class MovieService {

  constructor() { }

  getDetail (id:string): Observable<Movie | undefined>  {
    return of(moviesMock.find(movie => movie.id === id))

  }
  getList(): Observable<Movie[]>{
    return of(moviesMock);
  }

  getMovieByTitle(title:string): Observable<Movie | undefined>  {
    return of(moviesMock.find(movie => movie.title === title))
  }
}
