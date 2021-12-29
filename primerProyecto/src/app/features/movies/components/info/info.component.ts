import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { MovieService } from '../../services/movie.service';
//import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy, AfterViewInit {

  movie: MovieAPI | any;
  urlPath: string = 'https://image.tmdb.org/t/p/w500';


  constructor(
    private activateRoute: ActivatedRoute,
    private moviesService: MovieService,
  )
    {
      console.log("INFO_COMPONENT - CONSTRUCTOR - CHECKED ");
     
    }

  ngOnInit(): void {
    console.log("INFO_COMPONENT - INIT - CHECKED ");

    this.moviesService.getDetailAPI(this.activateRoute.snapshot.params['id'])  //obtiene el id desde la ruta url a la llamada al componente
    .subscribe(respose => {this.movie = respose
      console.log(this.movie);

   }); // obtiene el detalle de la pelicula y la carga en el campo movie del componente local.
  }


   ngAfterViewInit(): void {
    console.log("INFO_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }

  ngOnDestroy(): void {
    console.log("INFO_COMPONENT - DESTROY - CHECKED ");
  }

}
