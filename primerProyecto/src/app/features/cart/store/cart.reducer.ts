
import { Action, createReducer, on } from "@ngrx/store";
import { CartState } from "./cart-store.state";
import { cartSetContent } from "./cart.actions";

export const cartInitialState: CartState = { status: "CLEAN", movies: [] }

export const _cartReducer = createReducer(

  cartInitialState,
  on(cartSetContent, (state, { status, movies }) => {
    // console.log("reducer:",status,movies);

    return {
      ...state,
      status,
      movies,
    };
  })
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
