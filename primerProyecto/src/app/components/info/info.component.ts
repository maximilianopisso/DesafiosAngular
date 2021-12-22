import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

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
  ) { }

  ngOnInit(): void {
    this.moviesService.getDetail(this.activateRoute.snapshot.params['id'])  //obtiene el id desde la ruta cartelera/id
    .subscribe(movie => this.movie = movie);
    console.log(this.movie);  //conultar esta linea
    console.log("LOGIN_COMPONENT - INIT - CHECKED ");
  }

   ngAfterViewInit(): void {
    console.log("LOGIN_COMPONENT - AFTER VIEW INIT - CHECKED ");

  }
   ngOnDestroy(): void {
    console.log("LOGIN_COMPONENT - DESTROY - CHECKED ");
  }

}
