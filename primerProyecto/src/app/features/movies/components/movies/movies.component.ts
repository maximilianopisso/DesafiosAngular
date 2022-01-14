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

      //SE ARMA LISTADO COMPLETO DE PELICULAS TRAYENDO LAS PELICULAS DESDE LA CONSULTA A LA API DE PELICULAS
      this.subcripcionMovie = this.movieService.getListAPI().subscribe(response => {
          this.moviesAPI = response
          // console.log(response)
          // console.log(this.moviesAPI)
      });

    }

    ngAfterViewInit(): void {
      console.log("MOVIES_COMPONENT - AFTER VIEW INIT - CHECKED ");
    }

    ngOnDestroy(): void {
      this.subcripcionMovie?.unsubscribe();
      console.log("MOVIES_COMPONENT - DESTROY - CHECKED ");
    }

    // METODO QUE ME PERMITE NAVEGAR A LA INFORMACION DE LA PELICULA SELECCIONADA
    navigateToDetail(id: number) {
      this.router.navigate(['cartelera', id]);
  }

}
