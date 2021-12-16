import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { moviesMock } from './movies.mock';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getList(): Observable<Movie[]>{
    return of(moviesMock);
  }

}
