import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-adm-movie-list',
  templateUrl: './adm-movie-list.component.html',
  styleUrls: ['./adm-movie-list.component.scss']
})
export class AdmMovieListComponent implements OnInit, OnDestroy {

  urlPath: string = environment.urlPathImage;
  idValue = 0;

  movies: MovieAPI[] = [];

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
    vote_average: new FormControl('-', [Validators.required, Validators.max(10), Validators.min(0)]),
    release_date: new FormControl('', [Validators.required]),
    overview: new FormControl('-', [Validators.required]),
  });


  titleControl = this.movieEditForm.controls['title'];
  poster_pathControl = this.movieEditForm.controls['poster_path'];
  vote_averageControl = this.movieEditForm.controls['vote_average'];
  release_dateControl = this.movieEditForm.controls['release_date'];
  overviewControl = this.movieEditForm.controls['overview'];

  private subscriptionsAdmMovie = new Subscription

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.subscriptionsAdmMovie.add(this.movieService.getListAPI().subscribe(response => {
      this.movies = response
    }, (err) => {
      console.log("Faltal Error")
      console.log(err);
      Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
    }
    )
    )
  }

  ngOnDestroy(): void {
    this.subscriptionsAdmMovie.unsubscribe();
  }

  clickMovie(movie: MovieAPI) {
    this.selectedMovie.id = movie.id  //ES PARA PODER ASIGANRLE A LA PELICULA CLICKEADA LA CLASE SELECTED

    // SE COMPLETA EL FORMULARIO DE EDICION, CON LA INFORMACION DE LA PELICULA SELECCIONADA
    this.idValue = movie.id;
    this.movieEditForm.controls['title'].setValue(movie.title);
    this.movieEditForm.controls['poster_path'].setValue(movie.poster_path);
    this.movieEditForm.controls['vote_average'].setValue(movie.vote_average);
    this.movieEditForm.controls['release_date'].setValue(movie.release_date);
    this.movieEditForm.controls['overview'].setValue(movie.overview)

  }

  newMovie() {
    this.selectedMovie.id = 0;   //ELIMINA SI LLEGARA HABER UNA PELICULA PREVIAMENTE SELECCIONADA
    this.idValue = 0;   // SE SETEA 0 PERO CUANDO SE REGISTRE, LA PROPIA API LE ASIGA EL ID FINAL

    // SE AUTOCOMPLETA EL FORMULARIO CON INFORMACION DE REFERENCIA
    this.movieEditForm.controls['title'].setValue('Agregar Titulo Pelicula')
    this.movieEditForm.controls['poster_path'].setValue('/endpoint')
    this.movieEditForm.controls['vote_average'].setValue(0)
    this.movieEditForm.controls['release_date'].setValue('2022-01-01')
    this.movieEditForm.controls['overview'].setValue('Agregar Descripción de tu Película')
  }

  isSelected(movie: MovieAPI): boolean {
    return (movie.id === this.selectedMovie.id);
  }

  addMovie() {
    //METODO PARA AGREGAR UNA NUEVA PELICULA EN LA API
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
      }, (err) => {
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
      }
      )
    )
  }

  deleteMovie() {
    //METODO PARA ELIMINAR UNA PELICULA DE LA API, TOMANDO EL ID DE LA PELICULA SELECCIONADA
    this.subscriptionsAdmMovie.add(
      this.movieService.removeMovie(this.idValue).subscribe(response => {
        this.subscriptionsAdmMovie.add(
          this.movieService.getListAPI().subscribe(response => {
            this.movies = response
          })
        );
        Swal.fire("PELICULA ELIMINADA", "La pelicula ha sido eliminada de la cartelera", "success");
        this.movieEditForm.reset();
      }, (err) => {
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error");
      })
    )
  }

  updateMovie() {
    //METODO PARA MODIFICAR UNA PELICULA DE LA API, TOMANDO EL ID DE LA PELICULA SELECCIONADA
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

      }, (err) => {
        console.log("Faltal Error")
        console.log(err);
        Swal.fire("ALGO SALIO MAL", "Error en conexion con datos", "error")
      })
    )
  }


}
