import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { MovieService } from '../../services/movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy, AfterViewInit {


  private subcripcionMovie: Subscription | undefined;
   moviesAPI : MovieAPI[] =[];
   urlPath: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private movieService: MovieService,
    private router: Router
    ) {
      console.log("MOVIES_COMPONENT - CONSTRUCTOR - CHECKED");
    }

    ngOnInit(): void {
      console.log("MOVIES_COMPONENT - INIT - CHECKED ");
      this.subcripcionMovie = this.movieService.getListAPI().subscribe(response => {       // Esto me arma el arreglo de moviesAPI con las peliculas que trae desde la API y me las muestra en consola.
          //this.moviesAPI = response.results
          this.moviesAPI = response,
          console.log(response)
          console.log(this.moviesAPI)
      });

      // this.subcripcionMovie=this.movieService.getList().subscribe(movies => this.movies = movies);   esto era la carga de pelis desde el mock de peliculas
    }

    ngAfterViewInit(): void {
      console.log("MOVIES_COMPONENT - AFTER VIEW INIT - CHECKED ");
      //const lastElement: any = document.querySelector('.ultima-movie');
      //lastElement?.scrollIntoView();
    }
    ngOnDestroy(): void {
      this.subcripcionMovie?.unsubscribe();
      console.log("MOVIES_COMPONENT - DESTROY - CHECKED ");
    }

    navigateToDetail(id: number) {
      this.router.navigate(['cartelera', id]);
  }

}
