import { Component, Input, OnInit,  } from '@angular/core';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import { MovieAPI } from 'src/app/models/movieAPI.model';

@Component({
  selector: 'app-adm-movie-list',
  templateUrl: './adm-movie-list.component.html',
  styleUrls: ['./adm-movie-list.component.scss']
})
export class AdmMovieListComponent implements OnInit {
  urlPath: string = 'https://image.tmdb.org/t/p/w500';


  @Input() movies: MovieAPI[] = [];

  @Input() movieempty: MovieAPI = {
    adult: false,
    backdrop_path: '',
    id: 0,
    genre_ids: [],
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '../../../assets/addition.png',
    release_date: '',
    title: 'Agregar Nueva',
    video: false,
    vote_average: 0,
    vote_count: 0
  }
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // Esto me arma el arreglo de moviesAPI con las peliculas que trae desde la API y me las muestra en consola.
    this.movieService.getListAPI().subscribe(response => { this.movies = response, console.log(response)

    this.movies.forEach(movie => {
    movie.poster_path = this.urlPath + movie.poster_path;

    })


    });

  }
}

