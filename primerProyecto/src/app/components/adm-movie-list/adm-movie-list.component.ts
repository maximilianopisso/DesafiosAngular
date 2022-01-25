import { AfterViewInit, Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-adm-movie-list',
  templateUrl: './adm-movie-list.component.html',
  styleUrls: ['./adm-movie-list.component.scss']
})
export class AdmMovieListComponent implements OnInit, AfterViewInit, OnDestroy {
  urlPath: string = 'https://image.tmdb.org/t/p/w500';
  idValue = 0;
  date = new Date

  movies: MovieAPI[] = [];
  emptyMovie: MovieAPI = {
    title: 'Agregar Titulo Pelicula',
    poster_path: '/endpoint',
    adult: false,
    backdrop_path: '',
    id: 0,
    genre_ids: [],
    original_language: '',
    original_title: '',
    overview: 'Agregar Descripcion de tu Pelicula',
    popularity: 0,
    release_date: '2022-01-01',
    video: false,
    vote_average: 0,
    vote_count: 0
  };
  selectedMovie: MovieAPI = {
    adult: false,
    backdrop_path: '',
    id: 0,
    genre_ids: [],
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  }

  movieEditForm = new FormGroup({
    title: new FormControl('-', [Validators.required]),
    poster_path: new FormControl('-', [Validators.required]),
    vote_average: new FormControl('-', [Validators.required,Validators.max(10),Validators.min(0)]),
    release_date: new FormControl('-', [Validators.required]),
    overview: new FormControl('-', [Validators.required]),
  });


  titleControl = this.movieEditForm.controls['title'];
  poster_pathControl = this.movieEditForm.controls['poster_path'];
  vote_averageControl = this.movieEditForm.controls['vote_average'];
  release_dateControl = this.movieEditForm.controls['release_date'];
  overviewControl = this.movieEditForm.controls['overview'];

  private subscriptionsAdmMovie= new Subscription

  constructor(
    private movieService: MovieService,
  ) {}



  ngOnInit(): void {


    //Este no anda
    // Esto me arma el arreglo de moviesAPI con las peliculas que trae desde la API y me las muestra en consola.
    this.subscriptionsAdmMovie.add( this.movieService.getListAPI().subscribe(response => {
        this.movies = response
      },(err)=>{
          console.log("Faltal Error")
          console.log(err);
          Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        }
      )
    )
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptionsAdmMovie.unsubscribe();
  }

  clickMovie(movie: MovieAPI) {
    this.selectedMovie.id = movie.id
    this.idValue = movie.id;
    this.movieEditForm.controls['title'].setValue(movie.title);
    this.movieEditForm.controls['poster_path'].setValue(movie.poster_path);
    this.movieEditForm.controls['vote_average'].setValue(movie.vote_average);
    this.movieEditForm.controls['release_date'].setValue(movie.release_date);
    this.movieEditForm.controls['overview'].setValue(movie.overview)

  }

  newMovie() {
    this.idValue = this.emptyMovie.id;
    this.movieEditForm.controls['title'].setValue(this.emptyMovie.title)
    this.movieEditForm.controls['poster_path'].setValue(this.emptyMovie.poster_path)
    this.movieEditForm.controls['vote_average'].setValue(this.emptyMovie.vote_average)
    this.movieEditForm.controls['release_date'].setValue(this.emptyMovie.release_date)
    this.movieEditForm.controls['overview'].setValue(this.emptyMovie.overview)
  }

  isSelected(movie: MovieAPI): boolean {
    return (movie.id === this.selectedMovie.id);
  }

  addMovie() {

    let newMovie: MovieAPI = {
      adult: false,
      backdrop_path: '',
      id: 0,
      genre_ids: [],
      original_language: '',
      original_title: '',
      overview: this.movieEditForm.controls['overview'].value,
      popularity: 0,
      poster_path: this.movieEditForm.controls['poster_path'].value,   //recortar string
      release_date: this.movieEditForm.controls['release_date'].value,
      title: this.movieEditForm.controls['title'].value,
      video: false,
      vote_average: this.movieEditForm.controls['vote_average'].value,
      vote_count: 0
    }

    this.subscriptionsAdmMovie.add(
      this.movieService.addMovie(newMovie).subscribe(response => {
        this.subscriptionsAdmMovie.add(
          this.movieService.getListAPI().subscribe(response => {
          this.movies = response
         })
        );
        this.newMovie();
      },(err)=>{
          console.log("Faltal Error")
          console.log(err);
          Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
        }
      )
    )
  }

  deleteMovie() {
    this.subscriptionsAdmMovie.add(
      this.movieService.removeMovie(this.idValue).subscribe(response => {
        this.subscriptionsAdmMovie.add(
          this.movieService.getListAPI().subscribe(response => {
            this.movies = response
          })
        );
        Swal.fire("PELICULA ELIMINADA", "La pelicula ha sido eliminada de la cartelera", "success");
        this.movieEditForm.reset();
      },(err)=>{
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
      })
    )
  }

  updateMovie() {

    let updateMovie: MovieAPI = {
      adult: false,
      backdrop_path: '',
      id: this.idValue,
      genre_ids: [],
      original_language: '',
      original_title: '',
      overview: this.movieEditForm.controls['overview'].value,
      popularity: 0,
      poster_path: this.movieEditForm.controls['poster_path'].value,
      release_date: this.movieEditForm.controls['release_date'].value,
      title: this.movieEditForm.controls['title'].value,
      video: false,
      vote_average: this.movieEditForm.controls['vote_average'].value,
      vote_count: 0
    }
    this.subscriptionsAdmMovie.add(
      this.movieService.updateMovie(updateMovie).subscribe(response => {
        this.subscriptionsAdmMovie.add(
          this.movieService.getListAPI().subscribe(response => {
            this.movies = response
          })
        );
        Swal.fire("PELICULA MODIFICADA", "La pelicula seleccionada ha sido modificada", "info");

      },(err)=>{
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error")
      })
    )
  }


}
