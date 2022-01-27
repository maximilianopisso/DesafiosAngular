import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { CartState } from 'src/app/features/cart/store/cart-store.state';
import { cartAddMovie } from 'src/app/features/cart/store/cart.actions';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy, AfterViewInit {

  movie: MovieAPI | any;
  urlPath: string = environment.urlPathImage
  popularidad_full_star : number[] =[];
  popularidad_half_star : number[] =[];
  fullStar:number =0;
  halfStar:number =0;

  private subscrptionsInfo = new Subscription;
  private movieList$!: Observable<CartState>;
  private status:string ="";
  constructor(
    private activateRoute: ActivatedRoute,
    private moviesService: MovieService,
    private cartService : CartService,
    private router: Router,
    private store: Store
  ){}

  ngOnInit(): void {

    this.subscrptionsInfo.add(

      this.moviesService.getDetailAPI(this.activateRoute.snapshot.params['id'])
      .subscribe(respose => {
        //ME TRAIGO DESDE LA API, LA MOVIE CON EL ID SOLICITADO
        this.movie = respose

        //CALCULO DE ESTRELLAS COMPLETAS Y MEDIAS ESTRELLAS PARA MOSTRAR EN POPULARIDAD DE LA MOVIE SELECCIONADA
        this.fullStar = Math.floor(Math.round(this.movie.vote_average)/2);
        this.halfStar = this.fullStar%2;
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
    )
  }


   ngAfterViewInit(): void {
    console.log("INFO_COMPONENT - AFTER VIEW INIT - CHECKED ");
  }

  ngOnDestroy(): void {
    console.log("INFO_COMPONENT - DESTROY - CHECKED ");
  }

  // METODO PARA AGREGA UNA NUEVA PELICULA AL CARRO, SI EXISTE NO LA AGREGA NUEVAMENTE

  addMovie(movie: MovieAPI){
    this.store.dispatch(cartAddMovie({movie: movie}))
  }

  // METODO PARA REDIGIR LA NAVEGACON HACIA LA CARTELERA (BOTON VOLVER A CARTELERA)
  returnToMovies(){
    this.router.navigate(['cartelera']);
  }

}
