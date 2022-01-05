import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { CartService } from 'src/app/services/cart.service';
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
  popularidad_full_star : number[] =[];
  popularidad_half_star : number[] =[];
  indexpopular:number =0;

  constructor(
    private activateRoute: ActivatedRoute,
    private moviesService: MovieService,
    private cartService : CartService,
    private router: Router,
  )
    {
      console.log("INFO_COMPONENT - CONSTRUCTOR - CHECKED ");

    }

  ngOnInit(): void {

    console.log("INFO_COMPONENT - INIT - CHECKED ");

    this.moviesService.getDetailAPI(this.activateRoute.snapshot.params['id'])  //obtiene el id desde la ruta url a la llamada al componente
    .subscribe(respose => {this.movie = respose
      console.log(this.movie);
      console.log("valoracion original",this.movie.vote_average);

      this.indexpopular = Math.round((this.movie.vote_average)/2);
      console.log("valoracion redondeada",this.indexpopular);

      for(let i=1; i<this.indexpopular; i++){
        this.popularidad_full_star.push(1);
      }

      this.indexpopular = (Math.round((this.movie.vote_average)/2))%2;
      console.log("media estrella?",this.indexpopular);
      if (this.indexpopular === 1){
        this.popularidad_half_star.push(1);
      }

   }); // obtiene el detalle de la pelicula y la carga en el campo movie del componente local.
  }


   ngAfterViewInit(): void {
    console.log("INFO_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }

  ngOnDestroy(): void {
    console.log("INFO_COMPONENT - DESTROY - CHECKED ");
  }

  addMovie(movie: MovieAPI){
    this.cartService.addMovie(movie)
    this.router.navigate(['carrito']);

  }
}
