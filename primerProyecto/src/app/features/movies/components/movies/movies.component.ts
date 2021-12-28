import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { MovieService } from '../../services/movie.service';
//import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy, AfterViewInit {


  private subcripcionMovie: Subscription | undefined;
  movies: Movie[] = [];
  //moviesApi : MovieAPI[] = []
  respuesta : MovieAPI[] =[];

  constructor(
    private movieService: MovieService,
    private router: Router
    ) {
      console.log("MOVIES_COMPONENT - CONSTRUCTOR - CHECKED");
    }

    ngOnInit(): void {
      console.log("MOVIES_COMPONENT - INIT - CHECKED ");
      this.subcripcionMovie=this.movieService.getList().subscribe( movies => this.movies = movies);
      this.movieService.getListAPI().subscribe(response => {
        this.respuesta = response.results;
        console.log(this.respuesta)
      });


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

    navigateToDetail(id: string) {
      this.router.navigate(['cartelera', id]);
  }

}
