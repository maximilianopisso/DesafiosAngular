import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmMovieListComponent } from './components/adm-movie-list/adm-movie-list.component';
import { CartComponent } from './components/cart/cart.component';
// import { InfoComponent } from './features/movies/components/info/info.component';
import { LoginComponent } from './components/login/login.component';
//import { MoviesComponent } from './features/movies/components/movies/movies.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
    path: 'cartelera',
    loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule)
  },

  {
    path: '',
    redirectTo: 'cartelera',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'carrito',
    component: CartComponent
  },

  {
    path:'admin',
    component: AdmMovieListComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
