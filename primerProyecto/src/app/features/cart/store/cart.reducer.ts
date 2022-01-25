
import { Action, createReducer, on } from "@ngrx/store";
import { CartState } from "./cart-store.state";
import { cartSetContent } from "./cart.actions";





export const cartInitialState: CartState = { movies: [] }



export const _cartReducer = createReducer(



    // on(cartAddItem, (state, { item }) => {

    //     const items = [...state.items];
    //     items.push(item);

    //     return {
    //         ...state,
    //         items
    //     };
    // }),

    // on(cartDeleteItem, (state, { itemId }) => {

    //     const items = [...state.items];
    //     const itemIndex = items.findIndex(cartItem => cartItem.id === itemId)
    //     items.splice(itemIndex, 1);

    //     return {
    //         ...state,
    //         items
    //     };
    // }),

    // on(cartClear, (state) => {
    //     return {
    //         ...state, 
    //         items: []
    //     };
    // }),

    cartInitialState,
    on(cartSetContent, (state, {movies}) => {
      return{
        ...state,
        movies,
      };
    })
);


export function cartReducer(state: any, action: any) {
    return _cartReducer(state, action);
  }
