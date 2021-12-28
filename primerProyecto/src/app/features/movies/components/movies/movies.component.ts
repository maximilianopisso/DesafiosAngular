import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { MovieService } from '../../services/movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy, AfterViewInit {


  private subcripcionMovie: Subscription | undefined;
   movies: Movie[] = [];
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
      this.subcripcionMovie=this.movieService.getList().subscribe( movies => this.movies = movies);
      this.movieService.getListAPI().subscribe(response => {
        this.moviesAPI = response.results;
        console.log(this.moviesAPI)

       // this.moviesAPI.forEach(movie => { movie.poster_path = this.urlPath+movie.poster_path
          // let aux:string;
          // aux = this.urlPath+movie.poster_path;
          // movie.poster_path = aux;
       // })
       // console.log(this.moviesAPI)



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

    navigateToDetail(id: number) {
      this.router.navigate(['cartelera', id]);
  }

}
