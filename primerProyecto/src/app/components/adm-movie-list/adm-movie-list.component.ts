import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import { MovieAPI } from 'src/app/models/movieAPI.model';

@Component({
  selector: 'app-adm-movie-list',
  templateUrl: './adm-movie-list.component.html',
  styleUrls: ['./adm-movie-list.component.scss']
})
export class AdmMovieListComponent implements OnInit {

  @Input() movies: MovieAPI[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    // Esto me arma el arreglo de moviesAPI con las peliculas que trae desde la API y me las muestra en consola.
    this.movieService.getListAPI().subscribe(response => {this.movies = response, console.log(response)})

  }
}

