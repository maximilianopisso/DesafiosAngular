import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies/movies.component';
import { InfoComponent } from './components/info/info.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { MenuNavComponent } from 'src/app/components/menu-nav/menu-nav.component';



@NgModule({
  declarations: [
    MoviesComponent,
    InfoComponent,

  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
  ]
})
export class MoviesModule { }

