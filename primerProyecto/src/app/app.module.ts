import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { MoviesComponent } from './features/movies/components/movies/movies.component';
// import { InfoComponent } from './features/movies/components/info/info.component';
import { CartComponent } from './components/cart/cart.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material/material.module';
import { AdmMovieListComponent } from './components/adm-movie-list/adm-movie-list.component';
import { AdmMovieItemComponent } from './components/adm-movie-item/adm-movie-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // MoviesComponent,
    // InfoComponent,
    CartComponent,
    MenuNavComponent,
    FooterComponent,
    AdmMovieListComponent,
    AdmMovieItemComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
