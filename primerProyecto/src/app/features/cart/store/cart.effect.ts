
import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { MovieAPI } from "src/app/models/movieAPI.model";
import { CartService } from "src/app/services/cart.service";
import { cartAddMovie, cartClear, cartDeleteMovie, cartSetContent } from "./cart.actions";



@Injectable()

export class CartEffects {

  constructor(

    private actions: Actions,
    private cartService : CartService
  ){}


  cartAddItem$ = createEffect(()=>
  this.actions.pipe(
      ofType(cartAddMovie),
      switchMap(action => this.cartService.addMovie(action.movie)),
      map(data => cartSetContent({movies: data.cartContent as MovieAPI[]})),
    )
  );
  cartDeleteItem$ = createEffect(()=>
  this.actions.pipe(
      ofType(cartDeleteMovie),
      switchMap(action => this.cartService.removeMovie(action.movie)),
      map(data => cartSetContent({movies: data.cartContent as MovieAPI[]})),
    )
  );

  cartClean$ = createEffect(()=>
  this.actions.pipe(
      ofType(cartClear),
      switchMap(action => this.cartService.clearCart()),
      map(data => cartSetContent({movies: [] as MovieAPI[]})),
    )
  );

}


