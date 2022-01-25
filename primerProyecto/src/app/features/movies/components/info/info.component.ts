import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { MovieService } from '../../services/movie.service';

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
  fullStar:number =0;
  halfStar:number =0;

  private subscrptionsInfo = new Subscription;

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

    this.subscrptionsInfo.add(
      this.moviesService.getDetailAPI(this.activateRoute.snapshot.params['id'])  //obtiene el id desde la ruta url a la llamada al componente
      .subscribe(respose => {this.movie = respose
        console.log(this.movie);
        //console.log("valoracion original",this.movie.vote_average);

        this.fullStar = Math.floor(Math.round(this.movie.vote_average)/2);
        this.halfStar = this.fullStar%2;

        console.log(` Valoracion Original: ${this.movie.vote_average} \n Valoracion Redondeada : ${Math.round((this.movie.vote_average))} \n Cantidad Estrellas Completas:  ${this.fullStar} \n Cantidad Mitad-Estrellas : ${this.halfStar}`);

        for(let i=1; i<=this.fullStar; i++){
          this.popularidad_full_star.push(1);
        }

        if (this.halfStar === 1){
          this.popularidad_half_star.push(1);
        }
      },(err) => {
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        }
      )
    ) // obtiene el detalle de la pelicula y la carga en el campo movie del componente local.
  }


   ngAfterViewInit(): void {
    console.log("INFO_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }

  ngOnDestroy(): void {
    console.log("INFO_COMPONENT - DESTROY - CHECKED ");
  }

  // METODO PARA AGREGA UNA NUEVA PELICULA AL CARRO, SI EXISTE NO LA AGREGA NUEVAMENTE

  addMovie(movie: MovieAPI){

    this.subscrptionsInfo.add(
      this.cartService.addMovie(movie).subscribe(response =>{

        console.log(response);
        if (response.status !== 'OK'){
          Swal.fire("NO SE AGREGO PELICULA", "La pelicula seleccionada, ya ha sido agregada anteriormente a tu carrito", "error");
        }else{
          Swal.fire("NUEVA PELICULA AGREGADA", "La pelicula seleccionada, fue agregada a tu carrito", "success");
          this.router.navigate(['carrito']);
        }
      },(err) => {
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        }
      )
    )
  }

  returnToMovies(){
    this.router.navigate(['cartelera']);
  }

}
