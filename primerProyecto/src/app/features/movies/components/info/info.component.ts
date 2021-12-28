import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from '../../services/movie.service';
//import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy, AfterViewInit {

  movie: Movie | any;

  constructor(
    private activateRoute: ActivatedRoute,
    private moviesService: MovieService,
  ) {console.log("INFO_COMPONENT - CONSTRUCTOR - CHECKED "); }

  ngOnInit(): void {
   this.moviesService.getDetail(this.activateRoute.snapshot.params['id'])  //obtiene el id desde la ruta url a la llamada al componente
    .subscribe(movie => this.movie = movie); // obtiene el detalle de la pelicula y la carga en el campo movie del componente local.
    console.log("INFO_COMPONENT - INIT - CHECKED ");
  }

   ngAfterViewInit(): void {
    console.log("INFO_COMPONENT - AFTER VIEW INIT - CHECKED ");

  }
   ngOnDestroy(): void {
    console.log("INFO_COMPONENT - DESTROY - CHECKED ");
  }

}
