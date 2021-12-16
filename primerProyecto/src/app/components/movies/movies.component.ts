import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    //private router: Router
  ) { }

  movies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getList().subscribe( movies => this.movies = movies);
  }

  // navigateToDetail(id: string) {
  //   this.router.navigate(['peliculas', id]);
  // }

}
