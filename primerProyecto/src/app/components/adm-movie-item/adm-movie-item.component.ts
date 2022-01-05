import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI } from 'src/app/models/movieAPI.model';

@Component({
  selector: 'app-adm-movie-item',
  templateUrl: './adm-movie-item.component.html',
  styleUrls: ['./adm-movie-item.component.scss']
})
export class AdmMovieItemComponent implements OnInit {
  urlPath: string = 'https://image.tmdb.org/t/p/w500';
  @Input() movie: MovieAPI = {
    title: '', poster_path: '',
    adult: false,
    backdrop_path: '',
    id: 0,
    genre_ids: [],
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    release_date: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
