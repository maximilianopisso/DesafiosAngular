import { Action, createReducer, on } from "@ngrx/store";
import { CartState } from "./cart-store.model";
import { cartAddItem, cartClear, cartDeleteItem } from "./cart.actions";



export const cartInitialState: CartState = { items: [] }



export const _cartReducer = createReducer(

    cartInitialState,
    on(cartAddItem, (state, { item }) => {

        const items = [...state.items];
        items.push(item);

        return {
            ...state,
            items
        };
    }),

    on(cartDeleteItem, (state, { itemId }) => {

        const items = [...state.items];
        const itemIndex = items.findIndex(cartItem => cartItem.id === itemId)
        items.splice(itemIndex, 1);

        return {
            ...state,
            items
        };
    }),

    on(cartClear, (state) => {
        return {
            ...state,
            items: []
        };
    }),
);


export function cartReducer(state: any, action: any) {
    return _cartReducer(state, action);
  }
