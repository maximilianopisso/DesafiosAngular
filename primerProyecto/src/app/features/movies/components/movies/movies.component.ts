import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { MovieService } from '../../services/movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy, AfterViewInit {


  private subscriptionsMovies = new Subscription;

  moviesAPI : MovieAPI[] =[];
  urlPath: string = environment.urlPathImage;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private store : Store
    ) {
      console.log("MOVIES_COMPONENT - CONSTRUCTOR - CHECKED");
    }

    ngOnInit(): void {
      console.log("MOVIES_COMPONENT - INIT - CHECKED ");

      //SE ARMA LISTADO COMPLETO DE PELICULAS TRAYENDO LAS PELICULAS DESDE LA CONSULTA A LA API DE PELICULAS


      this.subscriptionsMovies?.add(
        this.movieService.getListAPI().subscribe(response => {
            this.moviesAPI = response
            // console.log(response)
            // console.log(this.moviesAPI)
        },(err) => {
          console.log("Faltal Error")
          console.log(err);
          Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        })
      );
    }

    ngAfterViewInit(): void {
      console.log("MOVIES_COMPONENT - AFTER VIEW INIT - CHECKED ");
    }

    ngOnDestroy(): void {
      this.subscriptionsMovies?.unsubscribe();
      console.log("MOVIES_COMPONENT - DESTROY - CHECKED ");
    }

    // METODO QUE ME PERMITE NAVEGAR A LA INFORMACION DE LA PELICULA SELECCIONADA
    navigateToDetail(id: number) {
      this.router.navigate(['cartelera', id]);
  }

}
