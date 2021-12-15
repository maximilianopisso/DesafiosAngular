import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { movieMock } from './movie.mock';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }


  getList(): Observable<Movie[]>{
    return of(movieMock);
  }

}
