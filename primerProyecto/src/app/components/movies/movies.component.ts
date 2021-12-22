import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy, AfterViewInit {


  private subcripcionMovie: Subscription | undefined;
  movies: Movie[] = [];


  constructor(
    private movieService: MovieService,
    private router: Router
    ) {
      console.log("MOVIES_COMPONENT - CONSTRUCTOR - CHECKED");
    }

    ngOnInit(): void {
      console.log("MOVIES_COMPONENT - INIT - CHECKED ");
      this.subcripcionMovie=this.movieService.getList().subscribe( movies => this.movies = movies);
    }

    ngAfterViewInit(): void {
      console.log("MOVIES_COMPONENT - AFTER VIEW INIT - CHECKED ");
      const lastElement: any = document.querySelector('.ultima-movie');
      lastElement?.scrollIntoView();
    }
    ngOnDestroy(): void {
      this.subcripcionMovie?.unsubscribe();
      console.log("MOVIES_COMPONENT - DESTROY - CHECKED ");
    }

    navigatetoDetail(id: string) {
      this.router.navigate(['cartelera', id]);
  }

}
