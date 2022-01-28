import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieAPI } from 'src/app/models/movieAPI.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-adm-movie-item',
  templateUrl: './adm-movie-item.component.html',
  styleUrls: ['./adm-movie-item.component.scss']
})
export class AdmMovieItemComponent implements OnInit {
  urlPath: string = environment.urlPathImage
  @Input() index: number | any;
  @Input() movie: MovieAPI | any

  constructor() { }
  ngOnInit(): void { }

}
